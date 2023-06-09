import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {RentService} from "../../services/rent.service";
import {Rent} from "../../interfaces/rent";

@Component({
  selector: 'app-weekly',
  templateUrl: './weekly.page.html',
  styleUrls: ['./weekly.page.scss'],
})
export class WeeklyPage implements OnInit {

  items: Rent[] = [];
  filteredItems: Rent[]= [];

  constructor(private service: RentService, private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    const today = new Date();

    const nextSaturday = new Date(today);
    const nextSaturdayDay = today.getDate() + ((6 - today.getDay()) % 7);
    nextSaturday.setDate(nextSaturdayDay);
    nextSaturday.setHours(0, 0, 0)

    const nextWeekSaturday = new Date(today);
    const nextWeekSaturdayDay = today.getDate() + ((6 - today.getDay()) % 7) + 7;
    nextWeekSaturday.setDate(nextWeekSaturdayDay);
    nextWeekSaturday.setHours(0, 0, 0)

    this.service.getRents().subscribe(rents => {
      this.items = this.service.getWeeklyRent(rents, nextSaturday, nextWeekSaturday);
      this.cd.detectChanges();
      this.filterItems();
    })


  }

  // @ts-ignore
  searchQuery: string;
  // @ts-ignore
  openDetails(id) {
    console.log(id);
  }

  filterItems() {
    if (!this.searchQuery) {
      this.filteredItems = this.items; // If search query is empty, show all items
    } else {
      this.filteredItems = this.items.filter((item) =>
        item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      ); // Filter items based on the search query
    }
  }


}
