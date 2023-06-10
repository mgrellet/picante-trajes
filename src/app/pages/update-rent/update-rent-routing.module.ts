import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateRentPage } from './update-rent.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateRentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateRentPageRoutingModule {}
