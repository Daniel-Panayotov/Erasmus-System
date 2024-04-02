export type adminSectionString =
  | 'faculties'
  | 'fields'
  | 'foreignContacts'
  | 'receivingContacts';

export type adminActionString =
  | 'delete'
  | 'getPage'
  | 'getByParam'
  | 'updateOne'
  | 'createOne'
  | 'getAll';

export interface routeEnv {
  getPageUrl: string;
  getPageByParamUrl: string;
  createOneUrl: string;
  updateOneUrl: string;
  deleteOneUrl: string;
  getAllUrl: string;
}

export type authSectionString = 'admins' | 'users';

export type authActionString = 'login' | 'register';

export interface authRouteEnv {
  loginUrl: string;
  registerUrl?: string;
}
