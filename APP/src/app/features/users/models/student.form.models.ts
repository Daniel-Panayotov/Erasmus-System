export interface Student {
  StudentID: number;
  FirstName: string;
  LastName: string;
  Gender: string;
  BirthDate: Date;
  Nationality: string;
  Address: string;
  PhoneNumber: string;
}

export type StudentFormModel = Omit<Student, 'StudentID' | 'BirthDate'> & {
  BirthDate: Date | null;
};
