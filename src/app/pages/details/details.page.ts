import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RentService} from "../../services/rent.service";
import {Rent, UIRent} from "../../interfaces/rent";
import {Subscription} from "rxjs";
import * as pdfMake from "pdfmake/build/pdfmake";
import {TCreatedPdf} from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import {HelpersService} from "../../services/helpers.service";

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit, OnDestroy {

  rent: UIRent;
  sub: Subscription;
  private pdfObj: TCreatedPdf;


  constructor(private service: RentService,
              private helperService: HelpersService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.sub = this.service.getRentById(id).subscribe(res => {
      this.rent = this.parseRent(res);
    })
  }

  private parseRent(res: Rent):UIRent {
    return {
      ...res,
      reservationDate: this.convertNumberToDate(res.reservationDate),
      fittingDate: this.convertNumberToDate(res.fittingDate),
      deliveryDate: this.convertNumberToDate(res.deliveryDate),
      returnDate: this.convertNumberToDate(res.deliveryDate)
    };
  }

  private convertNumberToDate(dateNumber: number): Date {
    console.log("date number", dateNumber)
    const dateString = dateNumber.toString();
    const year = parseInt(dateString.slice(0, 4), 10);
    const month = parseInt(dateString.slice(4, 6), 10) - 1; // Subtract 1 to make it 0-based
    const day = parseInt(dateString.slice(6, 8), 10);
    console.log("la date", new Date(year, month, day))
    return new Date(year, month, day);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  goToInvoice(rent: Rent) {
    this.router.navigate(['/invoice'], {state: {data: rent}});
  }


  generatePdf() {
    //this.helperService.generatePdf(this.rent);
  }

  downloadPdf() {
    //this.helperService.downloadPdf(this.rent);
  }



}
