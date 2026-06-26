export const institutionsPaths = (path: string[]) => ({
  view: path.concat(['view']),
  update: (institutionID: string) => path.concat([institutionID, 'update']),
  contacts: (institutionID: string) => path.concat([institutionID, 'contacts']),
  faculties: (institutionID: string) => path.concat([institutionID, 'faculties']),
});
