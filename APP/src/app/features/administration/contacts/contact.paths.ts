import { PathSegment } from '../../../shared/utils/app-route-utilities';

interface ContactsCreateNode extends PathSegment {
  institutions: PathSegment;
}
interface ContactsIDNode extends PathSegment {
  update: PathSegment;
  institutions: PathSegment;
}

export interface ContactsNode extends PathSegment {
  view: PathSegment;
  create: ContactsCreateNode;
  contactID: (contactID: string) => ContactsIDNode;
}

export const contacts = {
  segment: 'contacts',
  view: { segment: 'view' },
  create: { segment: 'create', institutions: { segment: 'institutions' } },
  contactID: (contactID: string) => ({
    segment: contactID,
    institutions: { segment: 'institutions' },
    update: { segment: 'update' },
  }),
};
