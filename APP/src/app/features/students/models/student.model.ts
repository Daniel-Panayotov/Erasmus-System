import { LanguageCompetencyFormModel } from './language-competency.model';

export interface StudentDataDTO {
  firstName: string;
  lastName: string;
  birthDate: Date;
  gender: string;
  nationality: string;
  address: string;
  phoneNumber: string;
}

export interface StudentBaseDTO {
  studentID: number;
  dataDTO: StudentDataDTO;
}

export interface NewStudent {
  languageCompetencies: LanguageCompetencyFormModel[];
  dataDTO: StudentDataDTO;
}

export type StudentFormModel = Omit<StudentDataDTO, 'birthDate'> & {
  birthDate: Date | null;
};
