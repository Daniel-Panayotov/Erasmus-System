import { StudentBaseDTO } from '../../students/models/student.model';

export interface UserDataDTO {
  email: string;
  password: string;
}

export interface UserBaseDTO {
  userID: number;
  dataDTO: UserDataDTO;
}

export interface SafeUser {
  userID: number;
  email: string;
  student?: StudentBaseDTO;
}
