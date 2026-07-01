import { buildNode, PathSegment } from '../../shared/utils/app-route-utilities';

export interface AuthenticationNode extends PathSegment {
  login: PathSegment;
  register: PathSegment;
  logout: PathSegment;
  refresh: PathSegment;
}

const authenticationTree = {
  segment: '/auth',
  login: { segment: 'login' },
  register: { segment: 'register' },
  logout: { segment: 'logout' },
  refresh: { segment: 'refresh' },
};

export const authentication = buildNode(authenticationTree) as AuthenticationNode;
