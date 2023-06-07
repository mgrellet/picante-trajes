import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {Rent} from "../interfaces/rent";
import 'firebase/compat/firestore';
import firebase from 'firebase/compat/app';
import { Firestore, collectionData, collection, doc, setDoc, deleteDoc, docSnapshots } from '@angular/fire/firestore';



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
      map(contacts => contacts as Rent[])
    );
  }

  getRentById(id: string): Observable<Rent> {
    const document = doc(this.firestore, `rental/${id}`);
    return docSnapshots(document)
    .pipe(
      map(doc => {
        const id = doc.id;
        const data = doc.data();
        return { id, ...data } as Rent;
      })
    );
  }

  createRent(rent: Rent): Promise<void> {
    const document = doc(collection(this.firestore, 'rental'));
    return setDoc(document, rent);
  }


  updateContact(rent: Rent, identifier: string): Promise<void> {
    const document = doc(this.firestore, 'rental', identifier);
    const { id, ...data } = rent;
    return setDoc(document, data);
  }

  deleteContact(id: string): Promise<void> {
    const document = doc(this.firestore, 'rental', id);
    return deleteDoc(document);
  }

  getWeeklyRent(rents: Rent[], startDate: Date, endDate: Date) {
    return rents.filter((item: Rent) => {
      const itemDate: Date = new Date(item.reservationDate);
      return itemDate >= startDate && itemDate <= endDate;
    });
  }

}
