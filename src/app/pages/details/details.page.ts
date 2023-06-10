import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {RentService} from "../../services/rent.service";
import {Rent} from "../../interfaces/rent";

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  rent: Rent;
  constructor(private service: RentService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.service.getRentById(id).subscribe(res=>{
      console.log("coso", res);
      this.rent = res;
    })
  }

}
