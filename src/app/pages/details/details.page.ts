import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {RentService} from "../../services/rent.service";
import {Rent} from "../../interfaces/rent";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit, OnDestroy {

  rent: Rent;
  sub: Subscription;

  constructor(private service: RentService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.sub = this.service.getRentById(id).subscribe(res => {
      this.rent = res;
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
