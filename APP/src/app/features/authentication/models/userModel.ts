export interface UserData {
  Email: string;
  Password: string;
}

export interface UserBase extends UserData {
  UserID: string;
}

export type UserToken = Omit<UserBase, 'Password'>;
