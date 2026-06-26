import { contactNewPaths } from './contacts-new/contact-new.paths';
import { contactPaths } from './contacts/contact.paths';
import { institutionsNewPaths } from './institutions-new/institutions-new.paths';
import { institutionsPaths } from './institutions/institutions.paths';

export const administrationPaths = {
  institutions: institutionsPaths.bind(this, ['/administration', 'institutions'])(),
  institutions_new: institutionsNewPaths.bind(this, ['/administration', 'new', 'institutions'])(),
  contacts: contactPaths.bind(this, ['/administration', 'contacts'])(),
  contacts_new: contactNewPaths.bind(this, ['/administration', 'new', 'contacts'])(),
};
