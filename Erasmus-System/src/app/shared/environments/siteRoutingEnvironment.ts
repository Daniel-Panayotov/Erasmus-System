export const home = '/home';
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

const userRoute = '/users';

export const userRoutes = {
  login: `${userRoute}/login`,
  register: `${userRoute}/register`,
};

export function getRouteAfterAuth(section: string): string {
  let route = '';

  switch (section) {
    case 'users':
      route = '/';
      break;
    case 'admins':
      route = adminRoutes.adminMenu;
      break;
  }

  return route;
}
