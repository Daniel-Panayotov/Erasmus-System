export const studentsPaths = {
  apply: (userID: string) => ['/students', 'apply', userID],
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
  languageCompetencyUpdate: (studentID: string, competencyID: string) => [
    '/students',
    studentID,
    'profile',
    'language-competencies',
    'update',
    competencyID,
  ],
};
