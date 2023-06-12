import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {Rent} from "../../interfaces/rent";
import {RentService} from "../../services/rent.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-update-rent',
  templateUrl: './update-rent.page.html',
  styleUrls: ['./update-rent.page.scss'],
})
export class UpdateRentPage implements OnInit, OnDestroy {
  updateRentForm: FormGroup;
  formIsEdited: boolean = false;
  rent: Rent;
  id: string | null;

  @ViewChild('updateForm') updateForm: FormGroupDirective;

  sub1: Subscription;
  sub2: Subscription;
  constructor(private service: RentService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');


    this.sub1 = this.service.getRentById(this.id)
      .subscribe(rent => {
        if (!rent) {
          this.router.navigate(['/home']);
        } else {
          this.rent = rent;
          console.log("update", this.rent)

          this.updateRentForm = new FormGroup({
            name: new FormControl(this.rent.name, Validators.required),
            dni: new FormControl(this.rent.dni, Validators.required),
            email: new FormControl(this.rent.email),
            phone: new FormControl(this.rent.phone, Validators.required),
            address: new FormControl(this.rent.address, Validators.required),
            reservationDate: new FormControl(this.rent.reservationDate, Validators.required),
            type: new FormControl(this.rent.type, Validators.required),
            size: new FormControl(this.rent.size, Validators.required),
            model: new FormControl(this.rent.model, Validators.required),
            color: new FormControl(this.rent.color, Validators.required),
            shirt: new FormControl(this.rent.shirt, Validators.required),
            tie: new FormControl(this.rent.tie, Validators.required),
            vest: new FormControl(this.rent.vest, Validators.required),
            price: new FormControl(this.rent.price, Validators.required),
            advancePayment: new FormControl(this.rent.advancePayment, Validators.required),
            notes: new FormControl(this.rent.notes, Validators.required),
            fittingDate: new FormControl(this.rent.fittingDate, Validators.required),
            deliveryDate: new FormControl(this.rent.deliveryDate, Validators.required),
            returnDate: new FormControl(this.rent.returnDate, Validators.required),
          });

          console.log("form", this.updateRentForm);
          this.sub2 = this.updateRentForm.valueChanges.subscribe(values => {
            this.formIsEdited = true;
          })
        }
      });

  }

  suitSizes: number[] = [
    40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62
  ]

  suitColors: string[] = [
    'Gris', 'Gris topo', 'Negro', 'Azul francia', 'Azul oscuro', 'Blanco', 'Violeta'
  ]

  submitForm() {
    // @ts-ignore
    this.updateForm.onSubmit(undefined);
  }

  updateRent(value: any) {
    let updatedRent: Rent = { id: this.rent.id, ...value };

    this.service.updateRent(updatedRent)
      .then(
        res => this.router.navigate(['/home'])
      );
  }

  deleteRent(id: string) {
    this.service.deleteRent(id).then(r =>{
      this.router.navigate(['/home']);
    })
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }
}
