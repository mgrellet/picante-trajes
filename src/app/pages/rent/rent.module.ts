import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RentPageRoutingModule } from './rent-routing.module';

import { RentPage } from './rent.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RentPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RentPage]
})
export class RentPageModule {}
