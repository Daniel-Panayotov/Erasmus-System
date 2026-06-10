export interface UserData {
  email: string;
  password: string;
}

export interface UserBase extends UserData {
  userID: string;
}

export type UserToken = Omit<UserBase, 'password'>;
