import {
  routeEnv,
  authRouteEnv,
  apiModuleString,
  authModuleString,
  authActionString,
  apiActionString,
} from 'src/app/types/apiEnvironmentTypes';

const apiUrl = 'http://localhost:5000';
const apiUserUrl = `${apiUrl}/users`;
const apiAdminUrl = `${apiUrl}/admins`;

export const cookieEnvironment = {
  verifyCookieUrl: `${apiUserUrl}/verify-cookie`,
};

export const adminsEnvironment: authRouteEnv = {
  loginUrl: `${apiAdminUrl}/login`,
};

const usersEnvironment: authRouteEnv = {
  loginUrl: `${apiUserUrl}/login`,
  registerUrl: `${apiUserUrl}/register`,
};

const apiFieldOfEducationUrl = `${apiUrl}/fields`;

const fieldsEnvironment: routeEnv = {
  getPageUrl: `${apiFieldOfEducationUrl}/getPage`,
  getPageByParamUrl: `${apiFieldOfEducationUrl}/getPageByParam`,
  createOneUrl: `${apiFieldOfEducationUrl}/create`,
  updateOneUrl: `${apiFieldOfEducationUrl}/updateOne`,
  deleteOneUrl: `${apiFieldOfEducationUrl}/deleteOne`,
  getAllUrl: `${apiFieldOfEducationUrl}/getAll`,
};

const apiFacultyUrl = `${apiUrl}/faculties`;

const facultyEnvironment: routeEnv = {
  getPageUrl: `${apiFacultyUrl}/getPage`,
  getPageByParamUrl: `${apiFacultyUrl}/getPageByParam`,
  createOneUrl: `${apiFacultyUrl}/createOne`,
  updateOneUrl: `${apiFacultyUrl}/updateOne`,
  deleteOneUrl: `${apiFacultyUrl}/deleteOne`,
  getAllUrl: `${apiFacultyUrl}/getAll`,
};

const apiForeignContactsUrl = `${apiUrl}/foreignContacts`;

const foreignContactsEnvironment: routeEnv = {
  getPageUrl: `${apiForeignContactsUrl}/getPage`,
  getPageByParamUrl: `${apiForeignContactsUrl}/getPageByParam`,
  createOneUrl: `${apiForeignContactsUrl}/createOne`,
  updateOneUrl: `${apiForeignContactsUrl}/updateOne`,
  deleteOneUrl: `${apiForeignContactsUrl}/deleteOne`,
  getAllUrl: `${apiForeignContactsUrl}/getAll`,
};

const apiReceivingContactsUrl = `${apiUrl}/receivingContacts`;

const receivingContactsEnvironment: routeEnv = {
  getPageUrl: `${apiReceivingContactsUrl}/getPage`,
  getPageByParamUrl: `${apiReceivingContactsUrl}/getPageByParam`,
  createOneUrl: `${apiReceivingContactsUrl}/createOne`,
  updateOneUrl: `${apiReceivingContactsUrl}/updateOne`,
  deleteOneUrl: `${apiReceivingContactsUrl}/deleteOne`,
  getAllUrl: `${apiReceivingContactsUrl}/getAll`,
};

const apiMobilitiesUrl = `${apiUrl}/mobilities`;

const mobilitiesEnvironment: routeEnv = {
  getPageUrl: `${apiMobilitiesUrl}/getPage`,
  getPageByParamUrl: `${apiMobilitiesUrl}/getPageByParam`,
  createOneUrl: `${apiMobilitiesUrl}/createOne`,
  updateOneUrl: `${apiMobilitiesUrl}/updateOne`,
  deleteOneUrl: `${apiMobilitiesUrl}/deleteOne`,
  getAllUrl: `${apiMobilitiesUrl}/getAll`,
};

const apiUserDataUrl = `${apiUrl}/usersData`;

const usersDataEnvironemnt: routeEnv = {
  getPageUrl: `${apiUserDataUrl}/getPage`,
  getPageByParamUrl: `${apiUserDataUrl}/getPageByParam`,
  createOneUrl: `${apiUserDataUrl}/createOne`,
  updateOneUrl: `${apiUserDataUrl}/updateOne`,
  deleteOneUrl: `${apiUserDataUrl}/deleteOne`,
  getAllUrl: `${apiUserDataUrl}/getAll`,
};

export function getRoute(
  adminModule: apiModuleString,
  action: apiActionString
): string {
  const environment = getEnvironment(adminModule);
  let url;

  switch (action) {
    case 'delete':
      url = environment.deleteOneUrl;
      break;
    case 'getPage':
      url = environment.getPageUrl;
      break;
    case 'getByParam':
      url = environment.getPageByParamUrl;
      break;
    case 'updateOne':
      url = environment.updateOneUrl;
      break;
    case 'createOne':
      url = environment.createOneUrl;
      break;
    case 'getAll':
      url = environment.getAllUrl;
      break;
  }

  return url;
}

function getEnvironment(adminModule: apiModuleString) {
  let env;
  switch (adminModule) {
    case 'fields':
      env = fieldsEnvironment;
      break;
    case 'faculties':
      env = facultyEnvironment;
      break;
    case 'foreignContacts':
      env = foreignContactsEnvironment;
      break;
    case 'receivingContacts':
      env = receivingContactsEnvironment;
      break;
    case 'mobilities':
      env = mobilitiesEnvironment;
      break;
    case 'usersData':
      env = usersDataEnvironemnt;
      break;
  }
  return env;
}

export function getAuthRoute(
  authModule: authModuleString,
  action: authActionString
): string {
  const environment = getAuthEnvironment(authModule);
  let url;

  switch (action) {
    case 'login':
      url = environment.loginUrl;
      break;
    case 'register':
      //for users only
      url = environment.registerUrl as string;
      break;
  }

  return url;
}

function getAuthEnvironment(adminMobile: authModuleString) {
  let env;
  switch (adminMobile) {
    case 'admins':
      env = adminsEnvironment;
      break;
    case 'users':
      env = usersEnvironment;
      break;
  }
  return env;
}
