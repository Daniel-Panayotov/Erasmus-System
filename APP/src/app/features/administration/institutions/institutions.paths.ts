import { PathSegment } from '../../../shared/utils/app-route-utilities';

interface InstitutionsCreateNode extends PathSegment {
  contacts: PathSegment;
  faculties: PathSegment;
}
interface InstitutionsIDNode extends PathSegment {
  update: PathSegment;
  contacts: PathSegment;
  faculties: PathSegment;
}

export interface InstitutionsNode extends PathSegment {
  view: PathSegment;
  create: InstitutionsCreateNode;
  institutionID: (institutionID: string) => InstitutionsIDNode;
}

export const institutions = {
  segment: 'institutions',
  view: { segment: 'view' },
  create: {
    segment: 'create',
    contacts: { segment: 'contacts' },
    faculties: { segment: 'faculties' },
  },
  institutionID: (institutionID: string) => ({
    segment: institutionID,
    update: { segment: 'update' },
    contacts: { segment: 'contacts' },
    faculties: { segment: 'faculties' },
  }),
};
