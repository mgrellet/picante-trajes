import {Injectable} from '@angular/core';
import {addDoc, collection, collectionData, Firestore, getDocs, query, where} from '@angular/fire/firestore';
import {Observable} from "rxjs";
import {Rent} from "../interfaces/rent";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class RentService {

  constructor(private firestore: Firestore) {
  }

  getRentList(): Observable<Rent[]> {
    const rentRef = collection(this.firestore, 'rental');
    return collectionData(rentRef, { idField: 'id'}) as Observable<Rent[]>;
  }


/*  getWeeklyRent(startDate: Date, endDate: Date):  Observable<Rent[]> {
    const collectionRef = collection(this.firestore, 'rental');

    console.log("fire", firebase.firestore.Timestamp.fromDate(new Date()));
    const q = query(collectionRef,
      where('reservationDate', '<=',  firebase.firestore.Timestamp.fromDate(startDate)),
      where('reservationDate', '>=',  firebase.firestore.Timestamp.fromDate(endDate)),
    );

    return new Observable<Rent[]>((observer) => {
      getDocs(q)
        .then((querySnapshot) => {
          const documents = querySnapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() } as Rent;
          });
          observer.next(documents);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
*/

  addRent(rent: Rent) {
    const rentRef = collection(this.firestore, 'rental');
    return addDoc(rentRef, rent);
  }
}
