import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {RentService} from "../../services/rent.service";
import {Rent} from "../../interfaces/rent";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-historical',
  templateUrl: './historical.page.html',
  styleUrls: ['./historical.page.scss'],
})
export class HistoricalPage implements OnInit, OnDestroy {

  items: Rent[] = [];
  filteredItems: Rent[] = [];
  sub: Subscription;


  constructor(private service: RentService, private cd: ChangeDetectorRef) {
    this.sub = this.service.getRents().subscribe(res => {
      this.items = res;
      this.cd.detectChanges();
      console.log(this.items);
      this.filterItems();
    });
  }

  ngOnInit() {
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

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
