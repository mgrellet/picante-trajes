import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RentService} from "../../services/rent.service";
import {Rent} from "../../interfaces/rent";
import {Subscription} from "rxjs";
import * as pdfMake from "pdfmake/build/pdfmake";
import {TCreatedPdf} from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit, OnDestroy {

  rent: Rent;
  sub: Subscription;
  private pdfObj: TCreatedPdf;


  constructor(private service: RentService, private activatedRoute: ActivatedRoute, private router: Router) {
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

  goToInvoice(rent: Rent) {
    this.router.navigate(['/invoice'], {state: {data: rent}});
  }

  generatePdf() {
    let docDefinition = {
      content: [
        {text: 'Tables', style: 'header'},
        'Official documentation is in progress, this document is just a glimpse of what is possible with pdfmake and its layout engine.',
        {text: 'A simple table (no headers, no width specified, no spans, no styling)', style: 'subheader'},
        'The following table has nothing more than a body array',
        {
          style: 'tableExample',
          table: {
            body: [
              ['Column 1', 'Column 2', 'Column 3'],
              ['One value goes here', 'Another one here', 'OK?']
            ]
          }
        }
      ]
    };

    this.pdfObj = pdfMake.createPdf(docDefinition);
    this.pdfObj.download();
  }

}
