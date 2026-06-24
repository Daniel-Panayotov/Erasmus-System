export const contactPaths = (path: string[]) => ({
  view: path.concat(['view']),
  update: (contactID: string) => path.concat(['update', contactID]),
});
