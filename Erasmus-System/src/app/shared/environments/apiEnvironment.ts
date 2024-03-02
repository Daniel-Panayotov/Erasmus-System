const apiUrl = 'http://localhost:5000';
const apiAdminUrl = `${apiUrl}/admins`;
const apiUserUrl = `${apiUrl}/users`;
const apiFieldOfEducationUrl = `${apiUrl}/fields`;

export const cookieEnvironment = {
  verifyAdminTokenUrl: `${apiAdminUrl}/verify`,
  verifyNormalCookieUrl: `${apiUserUrl}/verify-cookie`,
};

export const fieldsEnvironment = {
  getAllUrl: `${apiFieldOfEducationUrl}/getAll`,
  getOneByIdUrl: `${apiFieldOfEducationUrl}/getOne`,
  deleteOneUrl: `${apiFieldOfEducationUrl}/deleteOne`,
  createOneUrl: `${apiFieldOfEducationUrl}/create`,
  getOneByParamUrl: `${apiFieldOfEducationUrl}/getByParam`,
};

export const adminsEnvironment = {
  loginAdminUrl: `${apiAdminUrl}/login`,
};
