import { contactNewPaths } from './contacts-new/contact-new.paths';
import { contactPaths } from './contacts/contact.paths';

export const administrationPaths = {
  contacts: contactPaths.bind(this, ['/administration', 'contacts']),
  contacts_new: contactNewPaths.bind(this, ['/administration', 'new', 'contacts']),
};
