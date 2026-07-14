export interface ContactDataDTO {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export interface ContactBaseDTO {
  contactID: number;
  dataDTO: ContactDataDTO;
}

export interface ContactTableDTO extends ContactDataDTO {
  contactID: number;
}
