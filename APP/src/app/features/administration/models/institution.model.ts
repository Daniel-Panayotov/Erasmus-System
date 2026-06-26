export interface InstitutionData {
  code: string;
  name: string;
  address: string;
}

export interface InstitutionFormModel extends InstitutionData {}

export interface InstitutionBase extends InstitutionData {
  institutionID: number;
}

export interface SaveInstitution extends InstitutionData {
  contactIDs: number[];
  facultyIDs: number[];
}
