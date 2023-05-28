import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-rent',
  templateUrl: './rent.page.html',
  styleUrls: ['./rent.page.scss'],
})
export class RentPage implements OnInit {

  rentForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    const defaultDate = new Date(); // Replace with your desired default date

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
    console.log(this.rentForm.value);
    this.printInvalidElements();
    if (this.rentForm.valid) {
      console.log(this.rentForm.value);
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
