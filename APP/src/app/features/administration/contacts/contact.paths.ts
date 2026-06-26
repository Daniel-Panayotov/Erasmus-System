export const contactPaths = (path: string[]) => ({
  view: path.concat(['view']),
  create: path.concat(['create']),
  create_institutions: path.concat(['create', 'institutions']),
  update: (contactID: string) => path.concat([contactID, 'update']),
  update_institutions: (contactID: string) => path.concat([contactID, 'institutions']),
});
//TODO: CHECK WHAT DIFF THERE SHOULD BE BETWEEN INSTITUTIONS IN CREATE V UPDATE
