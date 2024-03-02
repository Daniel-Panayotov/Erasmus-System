const apiUrl = 'http://localhost:5000';
const apiAdminUrl = `${apiUrl}/admins`;
const apiUserUrl = `${apiUrl}/users`;
const apiFieldOfEducationUrl = `${apiUrl}/fields`;

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

export const adminsEnvironment = {
  loginAdminUrl: `${apiAdminUrl}/login`,
};
