export interface StudentData {
  firstName: string;
  lastName: string;
  birthDate: Date;
  gender: string;
  nationality: string;
  address: string;
  phoneNumber: string;
}

export interface StudentBase extends StudentData {
  studentID: number;
}

export type StudentFormModel = Omit<StudentBase, 'studentID' | 'birthDate'> & {
  birthDate: Date | null;
};
