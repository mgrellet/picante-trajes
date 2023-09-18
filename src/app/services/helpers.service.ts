import {Injectable} from '@angular/core';
import * as pdfMake from "pdfmake/build/pdfmake";
import {Rent} from "../interfaces/rent";
import {Platform} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  constructor(private platform: Platform) {
  }

  // Sample invoice data
  invoice = {
    number: 'INV-001',
    date: '2023-08-03',
    recipient: 'John Doe',
    items: [
      {description: 'Product A', quantity: 2, price: 50},
      {description: 'Product B', quantity: 1, price: 75},
      {description: 'Product C', quantity: 3, price: 30},
    ],
    total: 255,
  };


  // Define the content for the PDF
   content = [
    {text: 'Recibo', style: 'header'},
    `Señor(es).: ${this.invoice.recipient}`,
    `Reserva para fecha: ${this.invoice.date}`,
    {text: 'Items', style: 'subheader'},
    {
      table: {
        headerRows: 1,
        widths: ['*', 'auto', 'auto'],
        body: [
          ['Description', 'Quantity', 'Price'],
          ...this.invoice.items.map((item) => [item.description, item.quantity, `$${item.price}`]),
        ],
      },
    },
    {text: `Total: $${this.invoice.total}`, alignment: 'right', margin: [0, 20, 0, 0]},
  ];

  // Define the document definition
   docDefinition = {
    content: this.content,
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10],
      },
      subheader: {
        fontSize: 14,
        bold: true,
        margin: [0, 10, 0, 5],
      },
    },
  };

  generatePdf(rent: Rent) {

    // Generate the PDF
    // @ts-ignore
    const pdfDocGenerator = pdfMake.createPdf(this.docDefinition);

    // Convert the PDF object to a data URL or Blob
    pdfDocGenerator.getBlob((pdfBlob) => {
      // Create a Blob URL from the Blob
      const pdfFile = new File([pdfBlob], `recibo_${this.invoice.number}.pdf`, {type: 'application/pdf'});

      // Check if the Web Share API is supported
      if (navigator.share) {
        navigator
          .share({
            files: [pdfFile], // Pass the Blob URL to navigator.share
            title: 'Recibo PDF',
          })
          .then(() => {
            console.log('Shared successfully');
          })
          .catch((error) => {
            console.error('Error sharing:', error);
          });
      } else {
        // Fallback for devices/browsers that don't support Web Share API
        console.log('Web Share API is not supported on this device.');
        // Implement your own fallback sharing method here (if needed).
      }
    });

    // Generate the PDF
    // @ts-ignore
    //pdfMake.createPdf(docDefinition).download(`invoice_${invoice.number}.pdf`);
  }

  downloadPdf(rent: Rent) {
    // @ts-ignore
    pdfMake.createPdf(this.docDefinition).download(`recibo_${this.invoice.number}.pdf`);
  }


  /**
   * Converts a number to a string date.
   *
   * @param {number} dateNumber - The number to convert.
   * @returns {string} The string representation of the date.
   */
  convertNumberToStringDate(dateNumber: number): string {
    const dateString = dateNumber.toString();
    const year = dateString.slice(0, 4);
    const month = dateString.slice(4, 6);
    const day = dateString.slice(6, 8);
    return `${year}-${month}-${day}`;
  }

  /**
   * Converts a string date to a number.
   *
   * @param {string} date - The string date to be converted.
   * @return {number} The converted number.
   */
  convertStringDateToNumber(date: string): number {
    const newDate = date.replaceAll("-", "");
    const year = newDate.slice(0, 4);
    const month = newDate.slice(4, 6);
    const day = newDate.slice(6, 8);
    return parseInt(`${year}${month}${day}`);
  }
}
