import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {Rent} from "../interfaces/rent";
import 'firebase/compat/firestore';
import {collection, collectionData, deleteDoc, doc, docSnapshots, Firestore, setDoc} from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class RentService {

  constructor(private firestore: Firestore) {
  }

  getRents(): Observable<Rent[]> {
    const contactsCollection = collection(this.firestore, 'rental');
    return collectionData(contactsCollection, {idField: 'id'})
      .pipe(
        map(rents => rents as Rent[])
      );
  }

  getRentById(id: string | null): Observable<Rent> {
    const document = doc(this.firestore, `rental/${id}`);
    return docSnapshots(document)
      .pipe(
        map(doc => {
          const id = doc.id;
          const data = doc.data();
          return {id, ...data} as Rent;
        })
      );
  }

  createRent(rent: Rent): Promise<string> {
    const document = doc(collection(this.firestore, 'rental'));
    doc(collection(this.firestore, 'rental'))
    return setDoc(document, rent).then(r => document.id);
  }


  updateRent(rent: Rent): Promise<void> {
    const document = doc(this.firestore, 'rental', rent.id);
    const {id, ...data} = rent;
    return setDoc(document, data);
  }

  deleteRent(id: string): Promise<void> {
    const document = doc(this.firestore, 'rental', id);
    return deleteDoc(document);
  }

  getWeeklyRent(rents: Rent[], startDate: Date, endDate: Date): Rent[] {
    return rents.filter((item: Rent) => {
      const itemDate: Date = new Date(item.reservationDate);
      return itemDate >= startDate && itemDate <= endDate;
    });
  }

}
