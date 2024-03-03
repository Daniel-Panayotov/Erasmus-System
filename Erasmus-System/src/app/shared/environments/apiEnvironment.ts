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
  getAllForPageUrl: `${apiFieldOfEducationUrl}/getAllForPage`,
  getOneByIdUrl: `${apiFieldOfEducationUrl}/getOne`,
  deleteOneUrl: `${apiFieldOfEducationUrl}/deleteOne`,
  createOneUrl: `${apiFieldOfEducationUrl}/create`,
  getOneByParamUrl: `${apiFieldOfEducationUrl}/getByParam`,
  updateOneById: `${apiFieldOfEducationUrl}/UpdateOne`,
};

export const facultyEnvironment = {
  createOneUrl: `${apiFacultyUrl}/create`,
  getAll: `${apiFacultyUrl}/getAll`,
  getForPage: `${apiFacultyUrl}/getForPage`,
  updateOne: `${apiFacultyUrl}/update`,
  deleteOne: `${apiFacultyUrl}/delete`,
};

export const adminsEnvironment = {
  loginAdminUrl: `${apiAdminUrl}/login`,
};
