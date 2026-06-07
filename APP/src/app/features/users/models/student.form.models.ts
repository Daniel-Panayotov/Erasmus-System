export interface StudentData {
  FirstName: string;
  LastName: string;
  Gender: string;
  BirthDate: Date;
  Nationality: string;
  Address: string;
  PhoneNumber: string;
}

export interface StudentBase extends StudentData {
  StudentID: number;
}

export type StudentFormModel = Omit<StudentBase, 'StudentID' | 'BirthDate'> & {
  BirthDate: Date | null;
};
