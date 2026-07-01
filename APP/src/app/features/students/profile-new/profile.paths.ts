import { PathSegment } from '../../../shared/utils/app-route-utilities';

export interface NewProfileNode extends PathSegment {
  profile: PathSegment;
}
interface NewUpdateLanguageCompetenciesNode extends PathSegment {
  competencyIndex: (competencyIndex: string) => PathSegment;
}
export interface NewLanguageCompetenciesNode extends PathSegment {
  create: PathSegment;
  update: NewUpdateLanguageCompetenciesNode;
}

export const newProfileTree = {
  profile: {
    segment: 'profile',
  },
  language_competencies: {
    segment: 'language-competencies',
    create: { segment: 'create' },
    update: {
      segment: 'update',
      competencyIndex: (competencyIndex: string) => ({
        segment: competencyIndex,
      }),
    },
  },
};
