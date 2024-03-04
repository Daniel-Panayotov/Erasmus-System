const apiUrl = 'http://localhost:5000';
const apiAdminUrl = `${apiUrl}/admins`;
const apiUserUrl = `${apiUrl}/users`;
const apiFieldOfEducationUrl = `${apiUrl}/fields`;
const apiFacultyUrl = `${apiUrl}/faculties`;

export const cookieEnvironment = {
  verifyAdminTokenUrl: `${apiAdminUrl}/verify`,
  verifyNormalCookieUrl: `${apiUserUrl}/verify-cookie`,
};

export const fieldsEnvironment = {
  getForPageUrl: `${apiFieldOfEducationUrl}/getForPage`,
  getByParamUrl: `${apiFieldOfEducationUrl}/getByParam`,
  deleteOneUrl: `${apiFieldOfEducationUrl}/deleteOne`,
  createOneUrl: `${apiFieldOfEducationUrl}/create`,
  updateOneById: `${apiFieldOfEducationUrl}/UpdateOne`,
  getOneByIdUrl: `${apiFieldOfEducationUrl}/getOne`, //unused
};

export const facultyEnvironment = {
  getForPageUrl: `${apiFacultyUrl}/getForPage`,
  createOneUrl: `${apiFacultyUrl}/create`,
  updateOneUrl: `${apiFacultyUrl}/update`,
  deleteOneUrl: `${apiFacultyUrl}/delete`,
  getAllUrl: `${apiFacultyUrl}/getAll`, //unused
};

export const adminsEnvironment = {
  loginAdminUrl: `${apiAdminUrl}/login`,
};
