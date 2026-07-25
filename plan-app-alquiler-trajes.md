# Plan: App de gestión de alquiler de trajes

Basado en la factura de MARQUEZ (Alquiler de ropa de Etiqueta y Trajes) y la planilla de seguimiento semanal ("NOVIEMBRE", entregas por fecha).

## 1. Resumen del sistema

- **Uso**: solo el vendedor/dueño (no hay panel para el cliente final).
- **Multi-sucursal**: mismo dueño, varias sucursales, cada una con su propio stock y sus propios clientes.
- **Salida al cliente final**: link de WhatsApp (`wa.me`) con un PDF de la factura alojado en Supabase Storage.
- **Reemplaza**: la factura en papel + la planilla manual de seguimiento de entregas/devoluciones por semana.

## 2. Stack

| Capa | Tecnología | Por qué |
|---|---|---|
| Frontend | Next.js (React) + Tailwind | Un solo código para celu (PWA) y laptop (browser) |
| Backend/DB | Supabase (Postgres + Auth + Storage) | Datos relacionales (cliente↔alquiler↔prenda↔pago), RLS para separar sucursales, free tier |
| PDF | `@react-pdf/renderer` o `jspdf` | Genera la factura en el browser, sin backend extra |
| Envío | `wa.me` link con URL del PDF | Gratis, sin API paga de WhatsApp Business |
| Deploy frontend | Vercel | Free tier, deploy automático desde git |
| Cuentas | Supabase + Vercel a nombre del dueño del negocio | Vos como colaborador con acceso |

## 3. Modelo de datos (primer approach)

Extraído directamente de los campos que aparecen en las dos plantillas.

```sql
-- Sucursales del negocio
create table sucursales (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,           -- "MARQUEZ - Mendoza 764"
  direccion text,
  telefono text,
  whatsapp text,
  created_at timestamptz default now()
);

-- Usuarios (vendedores/dueño), vinculados a Supabase Auth
create table perfiles (
  id uuid primary key references auth.users(id),
  sucursal_id uuid references sucursales(id),
  nombre text,
  rol text not null check (rol in ('vendedor', 'dueno')),
  created_at timestamptz default now()
);

-- Clientes (Señor(es), DNI, Domicilio, Tel de la factura)
create table clientes (
  id uuid primary key default gen_random_uuid(),
  sucursal_id uuid references sucursales(id) not null,
  nombre text not null,
  dni text,
  domicilio text,
  telefono text,
  created_at timestamptz default now()
);

-- Prendas / stock (Un, Talle, Modelo, Color, Camisa, Corbata, Chaleco)
create table prendas (
  id uuid primary key default gen_random_uuid(),
  sucursal_id uuid references sucursales(id) not null,
  tipo text,              -- "traje", "smoking", etc. (viene de "Un:")
  modelo text,
  color text,
  talle text,
  camisa text,
  corbata text,
  chaleco text,
  disponible boolean default true,
  created_at timestamptz default now()
);

-- Alquileres (el cuerpo central de la factura)
create table alquileres (
  id uuid primary key default gen_random_uuid(),
  sucursal_id uuid references sucursales(id) not null,
  numero_boleta text,              -- "N° 0001-00000124"
  cliente_id uuid references clientes(id) not null,
  prenda_id uuid references prendas(id),
  fecha_reserva date,
  fecha_prueba date,
  fecha_entrega date,               -- clave: es lo que arma la planilla semanal
  fecha_devolucion date,
  precio_total numeric(10,2),
  anticipo numeric(10,2),
  saldo numeric(10,2) generated always as (precio_total - anticipo) stored,
  estado text default 'reservado' check (estado in ('reservado','entregado','devuelto','cancelado')),
  vendedor_id uuid references perfiles(id),
  created_at timestamptz default now()
);
```

**Row Level Security (RLS)**: cada tabla filtra por `sucursal_id = (select sucursal_id from perfiles where id = auth.uid())`, salvo que el rol sea `dueno`, en cuyo caso ve todas las sucursales. Esto se define con policies de Postgres, no en el frontend.

## 4. Fases del proyecto

### Fase 0 — Cuentas e infra (1 día)
1. El dueño crea cuenta en [supabase.com](https://supabase.com) y en [vercel.com](https://vercel.com) (gratis, con su email).
2. Te agrega como colaborador en ambos proyectos.
3. Creás el proyecto en Supabase → copiás `SUPABASE_URL` y `SUPABASE_ANON_KEY`.

### Fase 1 — Esqueleto de la app (1-2 días)
```bash
npx create-next-app@latest trajes-app --typescript --tailwind --app
cd trajes-app
npm install @supabase/supabase-js @supabase/ssr
```

Cliente de Supabase (`lib/supabase.ts`):
```typescript
import { createBrowserClient } from '@supabase/ssr'

export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
```

Corré el SQL de la sección 3 en el SQL Editor de Supabase, y activá RLS por tabla.

### Fase 2 — Auth + login del vendedor (1 día)
```typescript
// login simple con email/password
const { error } = await supabase.auth.signInWithPassword({
  email, password
})
```
Con 2-3 sucursales, alcanza con crear un usuario por vendedor manualmente desde el panel de Supabase Auth (no hace falta self-signup).

### Fase 3 — CRUD de alquileres (2-4 días)
Pantalla principal: lista de alquileres de la sucursal, filtrable por `fecha_entrega` (es el reemplazo directo de la planilla "NOVIEMBRE").

```typescript
// Alquileres a entregar esta semana, de mi sucursal (RLS lo filtra solo)
const { data, error } = await supabase
  .from('alquileres')
  .select('*, clientes(nombre, telefono), prendas(color, talle, modelo)')
  .gte('fecha_entrega', inicioSemana)
  .lte('fecha_entrega', finSemana)
  .order('fecha_entrega')
```

Formulario de alta = los mismos campos de la factura en papel (cliente, prenda, fechas, precio, anticipo).

**Lógica de "semana relevante" según el día de login**

Igual que hacían a mano con la planilla: entre semana se ve la semana actual, y el sábado se salta directo a la semana siguiente (para preparar las entregas que vienen).

```typescript
function getSemanaRelevante(hoy = new Date()) {
  const dia = hoy.getDay() // 0=domingo, 6=sábado

  // offset al lunes de la semana que contiene 'hoy'
  const diffALunes = (dia + 6) % 7
  const lunesActual = new Date(hoy)
  lunesActual.setDate(hoy.getDate() - diffALunes)
  lunesActual.setHours(0, 0, 0, 0)

  // si es sábado, saltamos a la semana siguiente
  const lunes = new Date(lunesActual)
  if (dia === 6) lunes.setDate(lunes.getDate() + 7)

  const domingo = new Date(lunes)
  domingo.setDate(lunes.getDate() + 6)
  domingo.setHours(23, 59, 59, 999)

  return { inicio: lunes, fin: domingo }
}
```

```typescript
const { inicio, fin } = getSemanaRelevante()

const { data, error } = await supabase
  .from('alquileres')
  .select('*, clientes(nombre, telefono), prendas(color, talle, modelo)')
  .gte('fecha_entrega', inicio.toISOString())
  .lte('fecha_entrega', fin.toISOString())
  .order('fecha_entrega')
```

Detalles a resolver en esta fase:
- Mostrar un header con el rango de la semana ("Entregas: 27/11 al 03/12"), para que quede claro qué semana se está viendo (sobre todo el sábado, que salta a la siguiente).
- Sumar flechas ◀ ▶ para navegar semana a semana manualmente — `getSemanaRelevante()` define solo el estado inicial al cargar la vista, no un límite fijo.

### Fase 4 — PDF de factura + WhatsApp (1-2 días)
```typescript
import { pdf } from '@react-pdf/renderer'
import FacturaPDF from '@/components/FacturaPDF'

async function generarYSubirFactura(alquiler) {
  const blob = await pdf(<FacturaPDF alquiler={alquiler} />).toBlob()
  const nombre = `factura-${alquiler.numero_boleta}.pdf`

  const { data } = await supabase.storage
    .from('facturas')
    .upload(nombre, blob, { upsert: true })

  const { data: urlData } = supabase.storage
    .from('facturas')
    .getPublicUrl(nombre)

  const mensaje = encodeURIComponent(
    `Hola ${alquiler.clientes.nombre}, acá tu factura de alquiler: ${urlData.publicUrl}`
  )
  const telefono = alquiler.clientes.telefono.replace(/\D/g, '')
  window.open(`https://wa.me/${telefono}?text=${mensaje}`, '_blank')
}
```

### Fase 5 — Multi-sucursal y vista del dueño (1-2 días)
- Dashboard simple para rol `dueno`: alquileres activos, saldos pendientes y stock, agrupados por sucursal (sin el filtro de RLS que aplica a los vendedores).
- Selector de sucursal en el header si el dueño quiere ver una en particular.

### Fase 6 — PWA + deploy (1 día)
- Agregar `manifest.json` + ícono para que el vendedor lo instale en el celu.
- Conectar el repo de GitHub a Vercel → deploy automático en cada push.
- Cargar las env vars de Supabase en Vercel.

## 5. Orden sugerido para arrancar

1. Tablas + RLS en Supabase (sección 3).
2. Login + lista de alquileres de la semana (reemplaza la planilla en papel — es el mayor dolor actual).
3. Alta de alquiler (reemplaza la factura en papel).
4. PDF + WhatsApp.
5. Sucursales y rol dueño.
6. PWA + pulido.

Con los pasos 1-3 ya tenés algo usable en producción para un vendedor real; el resto se puede ir sumando con la app ya en uso.
