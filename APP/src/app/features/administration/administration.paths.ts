import { buildNode, PathSegment } from '../../shared/utils/app-route-utilities';
import { ContactsNode, contacts } from './contacts/contact.paths';
import { universities, UniversitiesNode } from './universities/university.paths';

export interface AdministrationNode extends PathSegment {
  contacts: ContactsNode;
  universities: UniversitiesNode;
}

const administrationTree = {
  segment: '/administration',
  contacts,
  universities,
};

export const administration = buildNode(administrationTree) as AdministrationNode;
