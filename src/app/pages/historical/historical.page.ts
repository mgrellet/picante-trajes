import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {RentService} from "../../services/rent.service";

@Component({
  selector: 'app-historical',
  templateUrl: './historical.page.html',
  styleUrls: ['./historical.page.scss'],
})
export class HistoricalPage implements OnInit {

  notes: any[] = [];

  constructor(private service: RentService, private cd: ChangeDetectorRef) {
    this.service.getRentList().subscribe(res => {
      this.notes = res;
      this.cd.detectChanges();
      console.log(this.notes);
    });
  }

  ngOnInit() {
  }

}
