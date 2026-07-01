import { PathSegment } from '../../../shared/utils/app-route-utilities';

export interface ApplicationNode extends PathSegment {
  create: PathSegment;
}

export const applicationsTree = {
  segment: 'applications',
  create: { segment: 'create' },
};
