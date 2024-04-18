import { adminSectionString } from './apiEnvironmentTypes';

export interface adminRecords {
  [key: string]: adminRecordUnion[];
}

export interface DbDoc {
  _id: string;
  __v: number;
}

export type adminRecordUnion =
  | Faculty
  | Field
  | ForeignContact
  | ReceivingContact;

export interface Faculty extends DbDoc {
  name: string;
  coordinator: string;
  [key: string]: string | number;
}

export interface Field extends DbDoc {
  code: string;
  name: string;
  [key: string]: string | number;
}

export interface ForeignContact extends DbDoc {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  faculty: string;
  [key: string]: string | number;
}

export interface ReceivingContact extends DbDoc {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  faculty: Faculty;
  [key: string]: string | number | Faculty;
}

export interface generalAdminComponentInputs {
  adminModule: adminSectionString;
  sectionName: string;
  changePage: (pageNumber: number, searching: boolean) => Promise<void>;
}
