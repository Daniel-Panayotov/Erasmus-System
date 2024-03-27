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
  updateOneUrl: `${apiFieldOfEducationUrl}/UpdateOne`,
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

interface routeEnv {
  getPageUrl: string;
  getPageByParamUrl: string;
  createOneUrl: string;
  updateOneUrl: string;
  deleteOneUrl: string;
  getAllUrl: string;
}

export function getRoute(adminModule: string, action: string): string {
  const environment = getEnvironment(adminModule);
  let url = '';

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

function getEnvironment(adminSection: string) {
  let env = {} as routeEnv;
  switch (adminSection) {
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
  }
  return env;
}

interface authRouteEnv {
  loginUrl: string;
  registerUrl?: string;
}

export function getAuthRoute(authModule: string, action: string): string {
  const environment = getAuthEnvironment(authModule);
  let url = '';

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

function getAuthEnvironment(adminSection: string) {
  let env = {} as authRouteEnv;
  switch (adminSection) {
    case 'admins':
      env = adminsEnvironment;
      break;
    case 'users':
      env = usersEnvironment;
      break;
  }
  return env;
}
