import { Component, OnInit } from '@angular/core';
import {RentService} from "../../services/rent.service";

@Component({
  selector: 'app-weekly',
  templateUrl: './weekly.page.html',
  styleUrls: ['./weekly.page.scss'],
})
export class WeeklyPage implements OnInit {

  constructor(private service: RentService) { }

  ngOnInit() {
    const today = new Date();

    const nextSaturday = new Date(today);
    const nextSaturdayDay = today.getDate() + ((6 - today.getDay()) % 7);
    nextSaturday.setDate(nextSaturdayDay);

    const nextWeekSaturday = new Date(today);
    const nextWeekSaturdayDay = today.getDate() + ((6 - today.getDay()) % 7) + 7;
    nextWeekSaturday.setDate(nextWeekSaturdayDay);


  }

}
