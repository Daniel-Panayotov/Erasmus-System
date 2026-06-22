import { StudentBase } from '../../students/models/student.model';

export interface UserData {
  email: string;
  password: string;
}

export interface UserBase extends UserData {
  userID: string;
}

export type SafeUser = Omit<UserBase, 'password'> & {
  student?: StudentBase;
};
