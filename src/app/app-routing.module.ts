import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'rent',
    loadChildren: () => import('./pages/rent/rent.module').then(m => m.RentPageModule)
  },
  {
    path: 'historical',
    loadChildren: () => import('./pages/historical/historical.module').then( m => m.HistoricalPageModule)
  },
  {
    path: 'weekly',
    loadChildren: () => import('./pages/weekly/weekly.module').then( m => m.WeeklyPageModule)
  },
  {
    path: 'details/:id',
    loadChildren: () => import('./pages/details/details.module').then( m => m.DetailsPageModule)
  },
  {
    path: 'update-rent/:id',
    loadChildren: () => import('./pages/update-rent/update-rent.module').then( m => m.UpdateRentPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
