import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-rent',
  templateUrl: './rent.page.html',
  styleUrls: ['./rent.page.scss'],
})
export class RentPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  formData = {
    name: '',
    email: '',
    password: '',
    phone: '',
    dni: '',
    address: '',
    reservationDate: '',
    type: '',
    size: ''
  };
  suitSizes: number[] = [
    40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62
  ]
  submitForm() {
    // Perform your desired actions with the form data
    console.log('Form Data:', this.formData);

    // Reset the form
    this.formData = {
      name: '',
      email: '',
      password: '',
      phone: '',
      dni: '',
      address: '',
      reservationDate: '',
      type: '',
      size: ''
    };
  }

}
