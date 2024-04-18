export type adminModuleString =
  | 'faculties'
  | 'fields'
  | 'foreignContacts'
  | 'receivingContacts'
  | 'mobilities';

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

export type authModuleString = 'admins' | 'users';

export type authActionString = 'login' | 'register';

export interface authRouteEnv {
  loginUrl: string;
  registerUrl?: string;
}
