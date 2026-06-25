export const contactPaths = (path: string[]) => ({
  view: path.concat(['view']),
  update: (contactID: string) => path.concat([contactID, 'update']),
  institutions: (contactID: string) => path.concat([contactID, 'institutions']),
});
