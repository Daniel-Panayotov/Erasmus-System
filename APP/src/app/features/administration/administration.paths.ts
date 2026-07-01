import { buildNode, PathSegment } from '../../shared/utils/app-route-utilities';
import { ContactsNode, contacts } from './contacts/contact.paths';
import { institutions, InstitutionsNode } from './institutions/institutions.paths';

export interface AdministrationNode extends PathSegment {
  institutions: InstitutionsNode;
  contacts: ContactsNode;
}

const administrationTree = {
  segment: '/administration',
  institutions,
  contacts,
};

export const administration = buildNode(administrationTree) as AdministrationNode;
