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

  private parseRent(res: Rent): UIRent {
    return {
      ...res,
      reservationDate: this.helperService.convertNumberToStringDate(res.reservationDate),
      fittingDate: this.helperService.convertNumberToStringDate(res.fittingDate),
      deliveryDate: this.helperService.convertNumberToStringDate(res.deliveryDate),
      returnDate: this.helperService.convertNumberToStringDate(res.deliveryDate)
    };
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
