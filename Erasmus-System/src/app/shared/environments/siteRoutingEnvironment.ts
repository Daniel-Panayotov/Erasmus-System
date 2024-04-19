export const home = '/home';
const adminRoute = '/admins';
const adminMenuRoute = `${adminRoute}/menu`;

export const adminRoutes = {
  adminMenu: adminMenuRoute,
  login: `${adminRoute}/login`,
  students: `${adminMenuRoute}/students`,
  fields: `${adminMenuRoute}/fields-of-education`,
  faculties: `${adminMenuRoute}/faculties`,
  foreignContacts: `${adminMenuRoute}/foreign-contacts`,
  receivingContacts: `${adminMenuRoute}/receiving-contacts`,
  mobilities: `${adminMenuRoute}/mobilities`,
};

const userRoute = '/users';

export const userRoutes = {
  login: `${userRoute}/login`,
  register: `${userRoute}/register`,
  applyForm: `${userRoute}/apply-erasmus`,
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
