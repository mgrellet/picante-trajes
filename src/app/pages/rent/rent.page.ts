import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RentService} from "../../services/rent.service";
import {Rent} from "../../interfaces/rent";


@Component({
  selector: 'app-rent',
  templateUrl: './rent.page.html',
  styleUrls: ['./rent.page.scss'],
})
export class RentPage implements OnInit {

  rentForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private service: RentService) {
    const defaultDate = new Date();

    this.rentForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      dni: ['', Validators.required],
      address: ['', Validators.required],
      reservationDate: [defaultDate.toISOString(), Validators.required],
      type: ['', Validators.required],
      size: ['', Validators.required],
      model: ['', Validators.required],
      color: ['', Validators.required],
      shirt: false,
      tie: false,
      vest: false,
      price: ['', Validators.required],
      advancePayment: ['', Validators.required],
      balance: ['', Validators.required],
      notes: ['', Validators.required],
      fittingDate: [defaultDate.toISOString(), Validators.required],
      deliveryDate: [defaultDate.toISOString(), Validators.required],
      returnDate: [defaultDate.toISOString(), Validators.required],
    })

  }

  ngOnInit() {}

  suitSizes: number[] = [
    40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62
  ]

  suitColors: string[] = [
    'Gris', 'Gris topo', 'Negro', 'Azul francia', 'Azul oscuro', 'Blanco', 'Violeta'
  ]
  submitForm() {
    /*const rent: Rent = {
      address: this.rentForm.get('address')?.value,
      advancePayment: this.rentForm.get('advancePayment')?.value,
      balance: this.rentForm.get('balance')?.value,
      color: this.rentForm.get('color')?.value,
      dni: this.rentForm.get('dni')?.value,
      creationDate: new Date(),
      deliveryDate: new Date(this.rentForm.get('deliveryDate')?.value),
      email: this.rentForm.get('email')?.value,
      fittingDate: new Date(this.rentForm.get('fittingDate')?.value),
      model: this.rentForm.get('model')?.value,
      name: this.rentForm.get('name')?.value,
      phone: this.rentForm.get('phone')?.value,
      price: this.rentForm.get('price')?.value,
      reservationDate: new Date(this.rentForm.get('reservationDate')?.value),
      returnDate: new Date(this.rentForm.get('returnDate')?.value),
      shirt: this.rentForm.get('shirt')?.value,
      size: this.rentForm.get('size')?.value,
      tie: this.rentForm.get('tie')?.value,
      type: this.rentForm.get('type')?.value,
      vest: this.rentForm.get('vest')?.value,
    }
*/
    this.service.createRent(this.rentForm.value);

    this.printInvalidElements();
    if (this.rentForm.valid) {
      this.rentForm.reset();
    }
  }

  //Helper
  printInvalidElements() {
    Object.keys(this.rentForm.controls).forEach(key => {
      const control = this.rentForm.get(key);
      // @ts-ignore
      if (control.invalid) {
        console.log(`Invalid control: ${key}`);
      }
    });
  }

}
