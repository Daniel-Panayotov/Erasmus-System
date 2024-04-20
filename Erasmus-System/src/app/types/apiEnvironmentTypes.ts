export type apiModuleString =
  | 'faculties'
  | 'fields'
  | 'foreignContacts'
  | 'receivingContacts'
  | 'mobilities'
  | 'usersData';

export type apiActionString =
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
