import { docProperties } from 'src/app/types/docProperties';
import {
  contactsRegex,
  facultiesRegex,
  fieldsRegex,
  globalRegex,
} from './validationEnvironment';

export const environment = {
  authCookieName: 'authCookie',
};

// structure of documents with their properties, errors and regex
export const listDocProperties: docProperties = {
  fields: {
    code: {
      name: 'Code',
      error: 'Code must be 3 digits',
      regex: fieldsRegex.code,
    },
    name: {
      name: 'Name',
      error: 'Invalid Name',
      regex: fieldsRegex.fieldName,
    },
  },
  faculties: {
    name: {
      name: 'Name',
      error: 'Faculty Name must be at least 4 characters',
      regex: facultiesRegex.facultyName,
    },
    coordinator: {
      name: 'Coordinator',
      error: 'Invalid Coordinator Name',
      regex: facultiesRegex.personNames,
    },
  },
  foreignContacts: {
    firstName: {
      name: 'First Name',
      error: 'Invalid First Name',
      regex: contactsRegex.personName,
    },
    lastName: {
      name: 'Last Name',
      error: 'Invalid Last Name',
      regex: contactsRegex.personName,
    },
    email: {
      name: 'Email',
      error: 'Invalid Email',
      regex: globalRegex.emailRegex,
    },
    phone: {
      name: 'Phone',
      error: 'Invalid Phone Number',
      regex: globalRegex.phoneNumber,
    },
  },
};
