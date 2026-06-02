export interface ProfileFormModel {
  firstname: string;
  lastname: string;
  birthday: Date;
  gender: Gender;
  nationality: string;
  currentAddress: string;
  permanentAddress: string;
  phone: string;
}

export enum Gender {
  Male,
  Female,
  Other,
}
