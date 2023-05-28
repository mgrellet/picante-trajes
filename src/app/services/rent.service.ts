import {Injectable} from '@angular/core';
import {collection, collectionData, Firestore} from '@angular/fire/firestore';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RentService {

  constructor(private firestore: Firestore) {
  }

  getRentList(): Observable<any[]> {
    const notesRef = collection(this.firestore, 'rent');
    return collectionData(notesRef, { idField: 'id'}) as Observable<any[]>;
  }
}
