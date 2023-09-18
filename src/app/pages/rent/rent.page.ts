import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {RentService} from "../../services/rent.service";
import {Rent, UIRent} from "../../interfaces/rent";
import {Router} from "@angular/router";
import {HelpersService} from "../../services/helpers.service";


@Component({
  selector: 'app-rent',
  templateUrl: './rent.page.html',
  styleUrls: ['./rent.page.scss'],
})
export class RentPage implements OnInit {

  rentForm: FormGroup;
  @ViewChild('createForm') createForm: FormGroupDirective;


  constructor(private formBuilder: FormBuilder, private service: RentService, private helpersService: HelpersService, private router: Router) {
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
      balance: '',
      notes: '',
      fittingDate: [defaultDate.toISOString(), Validators.required],
      deliveryDate: [defaultDate.toISOString(), Validators.required],
      returnDate: [defaultDate.toISOString(), Validators.required],
    })

  }

  ngOnInit() {
  }

  suitSizes: number[] = [
    40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62
  ]

  suitColors: string[] = [
    'Gris', 'Gris topo', 'Negro', 'Azul francia', 'Azul oscuro', 'Blanco', 'Violeta'
  ]

  submitForm() {
    // @ts-ignore
    this.createForm.onSubmit(undefined);
  }

  createRent(value: UIRent) {
    const { reservationDate, fittingDate, deliveryDate, returnDate } = value;

    const newRent: Rent = {
      ...value,
      reservationDate: this.helpersService.convertStringDateToNumber(reservationDate),
      fittingDate: this.helpersService.convertStringDateToNumber(fittingDate),
      deliveryDate: this.helpersService.convertStringDateToNumber(deliveryDate),
      returnDate: this.helpersService.convertStringDateToNumber(returnDate)
    };

    this.service.createRent(newRent)
      .then(result => {
        this.rentForm.reset();
        this.router.navigate(['/details/' + result]);
      })
      .catch(console.error);
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
