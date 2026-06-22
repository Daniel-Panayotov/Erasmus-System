export const profilePaths = (path: string[]) => ({
  view: path.concat(['view']),
  update: path.concat(['update']),
  competencies_table: path.concat(['language-competencies']),
  competencies_create: path.concat(['language-competencies', 'create']),
  competencies_update: (competencyID: string) =>
    path.concat(['language-competencies', 'update', competencyID]),
});
