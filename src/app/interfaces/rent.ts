export interface Rent {
  //client info
  id?: string;
  dni: number
  name: string;
  email: string;
  phone: number;
  address: string;
  //reservation info
  reservationDate: Date; // Date to use as filter
  deliveryDate: Date;
  returnDate: Date;
  fittingDate: Date;
  price: number;
  advancePayment: number;
  balance: number;
  notes?: string;
  //rent details
  type: string;
  size: number;
  model: string;
  color: string;
  shirt: boolean;
  tie: boolean;
  vest: boolean;
  //metadata
  creationDate: Date;
}
