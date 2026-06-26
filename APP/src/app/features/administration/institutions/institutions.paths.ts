export const institutionsPaths = (path: string[]) => ({
  view: path.concat(['view']),

  create: path.concat(['create']),
  create_contacts: path.concat(['create', 'contacts']),
  create_faculties: path.concat(['create', 'faculties']),

  update: (institutionID: string) => path.concat([institutionID, 'update']),
  contacts: (institutionID: string) => path.concat([institutionID, 'contacts']),
  faculties: (institutionID: string) => path.concat([institutionID, 'faculties']),
});
