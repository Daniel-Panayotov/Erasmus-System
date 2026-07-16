import { PathSegment } from '../../../shared/utils/app-route-utilities';

interface UniversityIDNode extends PathSegment {
  update: PathSegment;
}
export interface UniversitiesNode extends PathSegment {
  view: PathSegment;
  create: PathSegment;
  universityID: (universityID: string) => UniversityIDNode;
}

export const universities = {
  segment: 'universities',
  view: { segment: 'view' },
  create: { segment: 'create' },
  universityID: (universityID: string) => ({
    segment: universityID,
    update: { segment: 'update' },
  }),
};
