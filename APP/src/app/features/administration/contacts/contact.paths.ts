import { PathSegment } from '../../../shared/utils/app-route-utilities';

interface ContactsIDNode extends PathSegment {
  update: PathSegment;
}

export interface ContactsNode extends PathSegment {
  view: PathSegment;
  create: PathSegment;
  contactID: (contactID: string) => ContactsIDNode;
}

export const contacts = {
  segment: 'contacts',
  view: { segment: 'view' },
  create: { segment: 'create' },
  contactID: (contactID: string) => ({
    segment: contactID,
    update: { segment: 'update' },
  }),
};
