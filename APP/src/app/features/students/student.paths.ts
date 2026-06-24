import { applicationPaths } from './applications/application.paths';
import { newProfilePaths } from './profile-new/profile.paths';
import { profilePaths } from './profile/profile.paths';

export const studentPaths = {
  applications: (studentID: string) =>
    applicationPaths.bind(this, ['/students', studentID, 'applications'])(),
  profiles: (studentID: string) => profilePaths.bind(this, ['/students', studentID, 'profile'])(),
  newProfile: (userID: string) => newProfilePaths.bind(this, ['/students', 'new', userID])(),
};
