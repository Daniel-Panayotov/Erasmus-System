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
      class: 'th-25',
    },
    name: {
      name: 'Name',
      error: 'Invalid Name',
      regex: fieldsRegex.fieldName,
      class: 'th-60',
    },
  },
  faculties: {
    name: {
      name: 'Name',
      error: 'Faculty Name must be at least 4 characters',
      regex: facultiesRegex.facultyName,
      class: 'th-50 ',
    },
    coordinator: {
      name: 'Coordinator',
      error: 'Invalid Coordinator Name',
      regex: facultiesRegex.personNames,
      class: 'th-35',
    },
  },
  foreignContacts: {
    firstName: {
      name: 'First Name',
      error: 'Invalid First Name',
      regex: contactsRegex.personName,
      class: 'th-10',
    },
    lastName: {
      name: 'Last Name',
      error: 'Invalid Last Name',
      regex: contactsRegex.personName,
      class: 'th-10',
    },
    email: {
      name: 'Email',
      error: 'Invalid Email',
      regex: globalRegex.emailRegex,
      class: 'th-20',
    },
    phone: {
      name: 'Phone',
      error: 'Invalid Phone Number',
      regex: globalRegex.phoneNumber,
      class: 'th-15',
    },
    faculty: {
      name: 'Faculty',
      error: 'Invalid Faculty Name',
      regex: facultiesRegex.facultyName,
      class: 'th-30',
      isRef: ['name', 'faculties'],
    },
  },
};
