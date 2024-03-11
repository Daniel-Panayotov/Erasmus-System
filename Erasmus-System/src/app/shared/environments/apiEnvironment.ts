import { IndexedApi } from 'src/app/types/paginationApi';

const apiUrl = 'http://localhost:5000';
const apiAdminUrl = `${apiUrl}/admins`;
const apiUserUrl = `${apiUrl}/users`;

export const cookieEnvironment = {
  verifyAdminTokenUrl: `${apiAdminUrl}/verify`,
  verifyNormalCookieUrl: `${apiUserUrl}/verify-cookie`,
};

export const adminsEnvironment = {
  loginAdminUrl: `${apiAdminUrl}/login`,
};

const apiFieldOfEducationUrl = `${apiUrl}/fields`;

const fieldsEnvironment = {
  getPageUrl: `${apiFieldOfEducationUrl}/getPage`,
  getPageByParamUrl: `${apiFieldOfEducationUrl}/getPageByParam`,
  createOneUrl: `${apiFieldOfEducationUrl}/create`,
  updateOneUrl: `${apiFieldOfEducationUrl}/UpdateOne`,
  deleteOneUrl: `${apiFieldOfEducationUrl}/deleteOne`,
};

const apiFacultyUrl = `${apiUrl}/faculties`;

const facultyEnvironment = {
  getPageUrl: `${apiFacultyUrl}/getPage`,
  getPageByParamUrl: `${apiFacultyUrl}/getPageByParam`,
  createOneUrl: `${apiFacultyUrl}/createOne`,
  updateOneUrl: `${apiFacultyUrl}/updateOne`,
  deleteOneUrl: `${apiFacultyUrl}/deleteOne`,
  getAllUrl: `${apiFacultyUrl}/getAll`,
};

const apiForeignContactsUrl = `${apiUrl}/foreignContacts`;

const foreignContactsEnvironment = {
  getPageUrl: `${apiForeignContactsUrl}/getPage`,
  getPageByParamUrl: `${apiForeignContactsUrl}/getPageByParam`,
  createOneUrl: `${apiForeignContactsUrl}/createOne`,
  updateOneUrl: `${apiForeignContactsUrl}/updateOne`,
  deleteOneUrl: `${apiForeignContactsUrl}/deleteOne`,
};

export function getRoute(adminModule: string, action: string): string {
  const environment = getEnvironment(adminModule) as any;
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
      //only for faculty
      url = environment.getAllUrl;
      break;
  }

  return url;
}

function getEnvironment(adminSection: string) {
  let env;
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
  }
  return env;
}
