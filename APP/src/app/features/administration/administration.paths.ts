import { contactPaths } from './contacts/contact.paths';
import { institutionsPaths } from './institutions/institutions.paths';

export const administrationPaths = {
  institutions: institutionsPaths.bind(this, ['/administration', 'institutions'])(),
  contacts: contactPaths.bind(this, ['/administration', 'contacts'])(),
};
