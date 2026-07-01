import { buildNode, PathSegment } from '../../shared/utils/app-route-utilities';
import { ApplicationNode, applicationsTree } from './applications/application.paths';
import {
  NewLanguageCompetenciesNode,
  NewProfileNode,
  newProfileTree,
} from './profile-new/profile.paths';
import { ProfileNode, profileTree } from './profile/profile.paths';

interface UserIDNode extends PathSegment {
  profile: NewProfileNode;
  language_competencies: NewLanguageCompetenciesNode;
}
interface NewNode extends PathSegment {
  userID: (userID: string) => UserIDNode;
}
interface StudentIDNode extends PathSegment {
  applications: ApplicationNode;
  profile: ProfileNode;
}

export interface StudentNode extends PathSegment {
  new: NewNode;
  studentID: (studentID: string) => StudentIDNode;
}

const students = {
  segment: '/students',
  new: {
    segment: 'new',
    userID: (userID: string) => ({
      segment: userID,
      ...newProfileTree,
    }),
  },
  studentID: (studentID: string) => ({
    segment: studentID,
    applications: applicationsTree,
    profile: profileTree,
  }),
};

export const studentsTree = buildNode(students) as StudentNode;
