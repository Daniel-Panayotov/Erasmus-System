import { applicationsPaths } from './applications/applications.paths';
import { newProfilePaths } from './profile-new/profile.paths';
import { profilePaths } from './profile/profile.paths';

export const studentsPaths = {
  applications: (studentID: string) =>
    applicationsPaths.bind(this, ['/students', studentID, 'applications'])(),
  profiles: (studentID: string) => profilePaths.bind(this, ['/students', studentID, 'profile'])(),
  newProfile: (userID: string) => newProfilePaths.bind(this, ['/students', 'new', userID])(),
};
