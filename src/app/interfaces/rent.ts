export interface Rent {
  //client info
  id: string;
  dni: number
  name: string;
  email: string;
  phone: number;
  address: string;
  //reservation info
  reservationDate: number; // Date to use as filter
  deliveryDate: number;
  returnDate: number;
  fittingDate: number;
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
  creationDate?: Date;
}

export interface UIRent {
  //client info
  id: string;
  dni: number
  name: string;
  email: string;
  phone: number;
  address: string;
  //reservation info
  reservationDate: any; // Date to use as filter
  deliveryDate: any;
  returnDate: any;
  fittingDate: any;
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
}
