const adminRoute = '/admins';
const adminMenuRoute = `${adminRoute}/menu`;

export const adminRoutes = {
  adminMenu: adminMenuRoute,
  login: `${adminRoute}/login`,
  students: `${adminMenuRoute}/students`,
  fieldsOfEdu: `${adminMenuRoute}/fields-of-education`,
  faculties: `${adminMenuRoute}/faculties`,
  foreignContacts: `${adminMenuRoute}/foreign-contacts`,
  receivingContacts: `${adminMenuRoute}/receiving-contacts`,
};
