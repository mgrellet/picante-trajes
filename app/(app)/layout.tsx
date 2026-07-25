import Link from "next/link";

/**
 * Layout de las pantallas de trabajo.
 * (app) no aparece en la URL: /entregas sigue siendo /entregas.
 */
export default function AppLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen bg-zinc-100 text-zinc-900">
            <header className="border-b border-zinc-200 bg-white">
                <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
                    <div className="text-sm font-semibold tracking-wide">MARQUEZ</div>
                    <nav className="flex gap-4 text-sm text-zinc-700">
                        <Link href="/entregas" className="hover:text-zinc-950">
                            Entregas
                        </Link>
                        <Link href="/alquileres/nuevo" className="hover:text-zinc-950">
                            Nuevo alquiler
                        </Link>
                    </nav>
                </div>
            </header>

            <main className="mx-auto max-w-5xl px-4 py-6">{children}</main>
        </div>
    );
}