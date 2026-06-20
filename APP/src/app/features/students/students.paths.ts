export const studentsPaths = {
  apply: (userID: string) => ['/students', userID, 'apply'],
  newProfile: (userID: string) => ['/students', 'new', userID, 'profile'],
  profile: (studentID: string) => ['/students', studentID, 'profile'],
  profileView: (studentID: string) => ['/students', studentID, 'profile', 'view'],
  profileUpdate: (studentID: string) => ['/students', studentID, 'profile', 'update'],
  languageCompetencies: (studentID: string) => [
    '/students',
    studentID,
    'profile',
    'language-competencies',
  ],
  languageCompetenciesCreate: (studentID: string) => [
    '/students',
    studentID,
    'profile',
    'language-competencies',
    'create',
  ],
  languageCompetencyUpdate: (studentID: string, competencyID: string) => [
    '/students',
    studentID,
    'profile',
    'language-competencies',
    'update',
    competencyID,
  ],
};
