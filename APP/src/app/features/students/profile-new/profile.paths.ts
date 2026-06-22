export const newProfilePaths = (path: string[]) => ({
  profile: path.concat(['profile']),
  competencies_table: path.concat(['language-competencies']),
  competencies_create: path.concat(['language-competencies', 'create']),
  competencies_update: (competencyI: string) =>
    path.concat(['language-competencies', 'update', competencyI]),
});
