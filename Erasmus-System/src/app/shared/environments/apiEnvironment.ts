import { IndexedApi } from 'src/app/types/paginationApi';

const apiUrl = 'http://localhost:5000';
const apiAdminUrl = `${apiUrl}/admins`;
const apiUserUrl = `${apiUrl}/users`;

export const cookieEnvironment = {
  verifyAdminTokenUrl: `${apiAdminUrl}/verify`,
  verifyNormalCookieUrl: `${apiUserUrl}/verify-cookie`,
};

const apiFieldOfEducationUrl = `${apiUrl}/fields`;

export const fieldsEnvironment = {
  getPageUrl: `${apiFieldOfEducationUrl}/getPage`,
  getPageByParamUrl: `${apiFieldOfEducationUrl}/getPageByParam`,
  createOneUrl: `${apiFieldOfEducationUrl}/create`,
  updateOneById: `${apiFieldOfEducationUrl}/UpdateOne`,
  deleteOneUrl: `${apiFieldOfEducationUrl}/deleteOne`,
  getOneByIdUrl: `${apiFieldOfEducationUrl}/getOne`, //unused
};

const apiFacultyUrl = `${apiUrl}/faculties`;

export const facultyEnvironment = {
  getPageUrl: `${apiFacultyUrl}/getPage`,
  getPageByParamUrl: `${apiFacultyUrl}/getPageByParam`,
  createOneUrl: `${apiFacultyUrl}/createOne`,
  updateOneUrl: `${apiFacultyUrl}/updateOne`,
  deleteOneUrl: `${apiFacultyUrl}/deleteOne`,
  getAllUrl: `${apiFacultyUrl}/getAll`, //unused
};

export const adminsEnvironment = {
  loginAdminUrl: `${apiAdminUrl}/login`,
};

export const paginationApi: IndexedApi = {
  fields: (action): string => {
    let url = '';

    switch (action) {
      case 'delete':
        url = fieldsEnvironment.deleteOneUrl;
        break;
      case 'getPage':
        url = fieldsEnvironment.getPageUrl;
        break;
      case 'getByParam':
        url = fieldsEnvironment.getPageByParamUrl;
        break;
      default:
        break;
    }
    return url;
  },
  faculties: (action): string => {
    let url = '';

    switch (action) {
      case 'delete':
        url = facultyEnvironment.deleteOneUrl;
        break;
      case 'getPage':
        url = facultyEnvironment.getPageUrl;
        break;
      case 'getByParam':
        url = facultyEnvironment.getPageByParamUrl;
        break;
      default:
        break;
    }
    return url;
  },
};
