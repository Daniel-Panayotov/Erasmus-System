import { InstitutionBase } from './institution.model';

export interface ContactData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export interface ContactFormModel extends ContactData {}
export interface SaveContact extends ContactData {
  institutionID: number | null;
}

export interface ContactBase extends ContactData {
  contactID: number;
}

export interface Contact extends ContactBase {
  institution: InstitutionBase | null;
}
