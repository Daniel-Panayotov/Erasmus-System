export type adminRecordUnion =
  | Faculty
  | Field
  | ForeignContact
  | ReceivingContact;

export interface Faculty {
  _id: string;
  name: string;
  coordinator: string;
  __v: number;
  [key: string]: string | number;
}

export interface Field {
  _id: string;
  code: string;
  name: string;
  __v: number;
  [key: string]: string | number;
}

export interface ForeignContact {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  faculty: string;
  __v: number;
  [key: string]: string | number;
}

export interface ReceivingContact {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  faculty: Faculty;
  __v: number;
  [key: string]: string | number | Faculty;
}
