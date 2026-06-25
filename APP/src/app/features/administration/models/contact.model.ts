export interface ContactData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export interface ContactBase extends ContactData {
  contactID: number;
}

export interface ContactFormModel extends ContactData {}

export interface SaveContact extends ContactData {
  institutionID: number | null;
}
