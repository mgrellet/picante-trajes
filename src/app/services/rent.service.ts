import {Injectable} from '@angular/core';
import {addDoc, collection, collectionData, Firestore} from '@angular/fire/firestore';
import {Observable} from "rxjs";
import {Rent} from "../interfaces/rent";

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

  addRent(rent: Rent) {
    const rentRef = collection(this.firestore, 'rental');
    return addDoc(rentRef, rent);
  }
}
