import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateRentPageRoutingModule } from './update-rent-routing.module';

import { UpdateRentPage } from './update-rent.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        UpdateRentPageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [UpdateRentPage]
})
export class UpdateRentPageModule {}
