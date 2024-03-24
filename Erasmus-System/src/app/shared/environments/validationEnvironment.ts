export const globalRegex = {
  emailRegex:
    /(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
  docId: /^[a-fA-F0-9]{24}$/,
  phoneNumber: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
  country: /^[a-zA-Z]{2,52}$/,
};

export const fieldsRegex = {
  // 1-50 case-insensitive characters includes whitespaces, letters and diggits(only last, up to 3)
  fieldName: /^[a-zA-Z\s]{4,50}(?:\d{1,3})?$/ /* identical, but matches 4-50 */,
  code: /^(\d{3})$/,
  select: /^(code|name)$/,
};

export const facultiesRegex = {
  facultyName: /^[a-zA-Z\s]{4,50}(?:\d{1,3})?$/,
  personNames: /^[a-zA-Z\s]{4,20}$/,
  select: /^(name|coordinator)$/,
};

export const contactsRegex = {
  personName: /^[a-zA-Z]{4,15}$/,
  select: /^(firstName|lastName|email|phone|faculty)$/,
};

export function getSelectRegex(adminModule: string): RegExp {
  const regexEnv = getRegexEnv(adminModule) as any;

  return regexEnv.select;
}

function getRegexEnv(adminModule: string) {
  let regexEnv;

  switch (adminModule) {
    case 'fields':
      regexEnv = fieldsRegex;
      break;
    case 'faculties':
      regexEnv = facultiesRegex;
      break;
    case 'foreignContacts':
      regexEnv = contactsRegex;
      break;
    case 'receivingContacts':
      regexEnv = contactsRegex;
      break;
    default:
      break;
  }
  return regexEnv;
}
