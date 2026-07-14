import { buildNode, PathSegment } from '../../shared/utils/app-route-utilities';
import { ContactsNode, contacts } from './contacts/contact.paths';

export interface AdministrationNode extends PathSegment {
  contacts: ContactsNode;
}

const administrationTree = {
  segment: '/administration',
  contacts,
};

export const administration = buildNode(administrationTree) as AdministrationNode;
