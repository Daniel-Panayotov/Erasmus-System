import { PathSegment } from '../../../shared/utils/app-route-utilities';

interface ProfileUpdateLanguageCompetenciesNode extends PathSegment {
  competencyID: (competencyID: string) => PathSegment;
}

interface ProfileLanguageCompetenciesNode extends PathSegment {
  create: PathSegment;
  update: ProfileUpdateLanguageCompetenciesNode;
}

export interface ProfileNode extends PathSegment {
  view: PathSegment;
  update: PathSegment;
  language_competencies: ProfileLanguageCompetenciesNode;
}

export const profileTree = {
  segment: 'profile',
  view: { segment: 'view' },
  update: { segment: 'update' },
  language_competencies: {
    segment: 'language-competencies',
    create: { segment: 'create' },
    update: {
      segment: 'update',
      competencyID: (competencyID: string) => ({
        segment: competencyID,
      }),
    },
  },
};
