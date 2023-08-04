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

  generatePdf(rent: Rent) {
    console.log("rent", rent);
    console.log(this.platform.is('mobileweb'));

    // Sample invoice data
    const invoice = {
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
    const content = [
      {text: 'Invoice', style: 'header'},
      `Invoice Number: ${invoice.number}`,
      `Date: ${invoice.date}`,
      `Recipient: ${invoice.recipient}`,
      {text: 'Items', style: 'subheader'},
      {
        table: {
          headerRows: 1,
          widths: ['*', 'auto', 'auto'],
          body: [
            ['Description', 'Quantity', 'Price'],
            ...invoice.items.map((item) => [item.description, item.quantity, `$${item.price}`]),
          ],
        },
      },
      {text: `Total: $${invoice.total}`, alignment: 'right', margin: [0, 20, 0, 0]},
    ];

    // Define the document definition
    const docDefinition = {
      content: content,
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

    // Generate the PDF
    // @ts-ignore
    const pdfDocGenerator = pdfMake.createPdf(docDefinition);

    // Convert the PDF object to a data URL or Blob
    pdfDocGenerator.getBlob((pdfBlob) => {
      // Create a Blob URL from the Blob
      const pdfFile = new File([pdfBlob], `invoice_${invoice.number}.pdf`, {type: 'application/pdf'});

      // Check if the Web Share API is supported
      if (navigator.share) {
        navigator
          .share({
            files: [pdfFile], // Pass the Blob URL to navigator.share
            title: 'Invoice PDF',
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
}