import { contactNewPaths } from './contacts-new/contact-new.paths';
import { contactPaths } from './contacts/contact.paths';
import { institutionPaths } from './institutions/institution.paths';

export const administrationPaths = {
  institutions: institutionPaths.bind(this, ['/administration', 'institutions'])(),
  contacts: contactPaths.bind(this, ['/administration', 'contacts'])(),
  contacts_new: contactNewPaths.bind(this, ['/administration', 'new', 'contacts'])(),
};
