import { docsWithProperties } from 'src/app/types/docProperties';
import {
  applicationsRegex,
  contactsRegex,
  facultiesRegex,
  fieldsRegex,
  globalRegex,
  mobilitiesRegex,
} from './validationEnvironment';

export const environment = {
  authCookieName: 'authCookie',
};

/* structure of documents with their properties, errors and regex
 * Use it to dynamically generate templates/forms/validate input
 * name: Desired name we want to display on the template
 * regex: desired regex to validate user input
 * error: message displayed when regex doesnt match
 * widthClass: determine the width in % for the table column
 * isShown: if prop should be showns in admin module
 * isRef: whether the property is a reference in the db.
 * - assignPropTo: name of property the value should be assigned to
 * - properties:
 *  - mainProp: property to use for api requests
 *  - propsList: list of properties to visualise in order
 */
export const listDocProperties: docsWithProperties = {
  fields: {
    code: {
      name: 'Code',
      error: 'Code must be 3 digits',
      regex: fieldsRegex.code,
      widthClass: 'th-25',
      isShown: true,
    },
    name: {
      name: 'Name',
      error: 'Invalid Name',
      regex: fieldsRegex.fieldName,
      widthClass: 'th-60',
      isShown: true,
    },
  },
  faculties: {
    name: {
      name: 'Name',
      error: 'Faculty Name must be at least 4 characters',
      regex: facultiesRegex.facultyName,
      widthClass: 'th-50',
      isShown: true,
    },
    coordinator: {
      name: 'Coordinator',
      error: 'Invalid Coordinator Name',
      regex: facultiesRegex.personNames,
      widthClass: 'th-35',
      isShown: true,
    },
  },
  foreignContacts: {
    firstName: {
      name: 'First Name',
      error: 'Invalid First Name',
      regex: contactsRegex.personName,
      widthClass: 'th-10',
      isShown: true,
    },
    lastName: {
      name: 'Last Name',
      error: 'Invalid Last Name',
      regex: contactsRegex.personName,
      widthClass: 'th-10',
      isShown: true,
    },
    email: {
      name: 'Email',
      error: 'Invalid Email',
      regex: globalRegex.emailRegex,
      widthClass: 'th-20',
      isShown: true,
    },
    phone: {
      name: 'Phone',
      error: 'Invalid Phone Number',
      regex: globalRegex.phoneNumber,
      widthClass: 'th-15',
      isShown: true,
    },
    faculty: {
      name: 'Faculty',
      error: 'Invalid Faculty Name',
      regex: facultiesRegex.facultyName,
      widthClass: 'th-30',
      isShown: true,
    },
  },
  receivingContacts: {
    firstName: {
      name: 'First Name',
      error: 'Invalid First Name',
      regex: contactsRegex.personName,
      widthClass: 'th-10',
      isShown: true,
    },
    lastName: {
      name: 'Last Name',
      error: 'Invalid Last Name',
      regex: contactsRegex.personName,
      widthClass: 'th-10',
      isShown: true,
    },
    email: {
      name: 'Email',
      error: 'Invalid Email',
      regex: globalRegex.emailRegex,
      widthClass: 'th-20',
      isShown: true,
    },
    phone: {
      name: 'Phone',
      error: 'Invalid Phone Number',
      regex: globalRegex.phoneNumber,
      widthClass: 'th-15',
      isShown: true,
    },
    faculty: {
      name: 'Faculty',
      error: 'Invalid Faculty Name',
      regex: facultiesRegex.facultyName,
      widthClass: 'th-30',
      isShown: true,
      isRef: {
        apiSection: 'faculties',
        assignPropTo: 'faculty',
        propsList: ['name'],
        mainProp: 'name',
      },
    },
  },
  mobilities: {
    code: {
      name: 'Code',
      error: 'Code must be 5-20 chars',
      regex: mobilitiesRegex.code,
      widthClass: 'th-15',
      isShown: true,
    },
    country: {
      name: 'Country',
      error: 'Country must be 2-52 chars',
      regex: globalRegex.country,
      widthClass: 'th-10',
      isShown: true,
    },
    validFrom: {
      name: 'Valid from',
      error: 'Invalid date format: dd/mm/yyyy',
      regex: globalRegex.date,
      widthClass: 'th-10',
      isShown: true,
    },
    validUntil: {
      name: 'Valid until',
      error: 'Invalid date format: dd/mm/yyyy',
      regex: globalRegex.date,
      widthClass: 'th-10',
      isShown: true,
    },
    university: {
      name: 'University',
      error: 'University must be 5-20 chars',
      regex: mobilitiesRegex.university,
      widthClass: 'th-10',
      isShown: true,
    },
    coordinator: {
      name: 'Coordinator',
      error: 'Coordinator names must be 5-40 chars',
      regex: facultiesRegex.personNames,
      widthClass: 'th-15',
      isShown: true,
    },
    address: {
      name: 'Address',
      error: 'Invalid Address',
      regex: globalRegex.normalSentences,
      widthClass: 'th-15',
      isShown: true,
    },
    lectureCount: {
      name: 'Lecture count',
      error: 'Invalid lecture count',
      regex: mobilitiesRegex.count,
      widthClass: null,
      isShown: false,
    },
    practiceCount: {
      name: 'Practice count',
      error: 'Invalid practice count',
      regex: mobilitiesRegex.count,
      widthClass: null,
      isShown: false,
    },
    subjectCodeRef: {
      name: 'Subject',
      error: 'Invalid subject',
      regex: fieldsRegex.code,
      widthClass: null,
      isShown: false,
      isRef: {
        apiSection: 'fields',
        assignPropTo: 'subjectCodeRef',
        propsList: ['code', 'name'],
        mainProp: 'code',
      },
    },
    sendingContactRef: {
      name: 'Sending Contact',
      error: 'Invalid sending contact',
      regex: globalRegex.emailRegex,
      widthClass: null,
      isShown: false,
      isRef: {
        apiSection: 'foreignContacts',
        assignPropTo: 'sendingContactRef',
        propsList: ['firstName', 'lastName'],
        mainProp: 'email',
      },
    },
    receivingContactRef: {
      name: 'Receiving Contact',
      error: 'Invalid receiving contact',
      regex: globalRegex.emailRegex,
      widthClass: null,
      isShown: false,
      isRef: {
        apiSection: 'receivingContacts',
        assignPropTo: 'receivingContactRef',
        propsList: ['firstName', 'lastName'],
        mainProp: 'email',
      },
    },
  },
  usersData: {
    // make id's?
    fieldOfStudyRef: {
      name: 'Field',
      error: 'Invalid field of study',
      regex: fieldsRegex.code,
      widthClass: null,
      isShown: true,
      isRef: {
        apiSection: 'fields',
        assignPropTo: 'fieldOfStudyRef',
        propsList: ['code', 'name'],
        mainProp: 'code',
      },
    },
    mobilityRef: {
      name: 'Mobility',
      error: 'Invalid mobility',
      regex: mobilitiesRegex.code,
      widthClass: null,
      isShown: true,
      isRef: {
        apiSection: 'mobilities',
        assignPropTo: 'mobilityRef',
        propsList: ['code', 'university'],
        mainProp: 'code',
      },
    },
    sendingContactRef: {
      name: 'Sending contact',
      error: 'Invalid sending contact',
      regex: globalRegex.emailRegex,
      widthClass: null,
      isShown: true,
      isRef: {
        apiSection: 'foreignContacts',
        assignPropTo: 'sendingContactRef',
        propsList: ['firstName', 'lastName'],
        mainProp: 'email',
      },
    },
    receivingFacultyRef: {
      name: 'Receiving faculty',
      error: 'Invalid receiving faculty',
      regex: facultiesRegex.facultyName,
      widthClass: null,
      isShown: true,
      isRef: {
        apiSection: 'faculties',
        assignPropTo: 'receivingFacultyRef',
        propsList: ['name'],
        mainProp: 'name',
      },
    },
    receivingContactRef: {
      name: 'Receiving contact',
      error: 'Invalid receiving contact',
      regex: globalRegex.emailRegex,
      widthClass: null,
      isShown: true,
      isRef: {
        apiSection: 'receivingContacts',
        assignPropTo: 'receivingContactRef',
        propsList: ['firstName', 'lastName'],
        mainProp: 'email',
      },
    },
  },
  applications: {
    userRef: {
      name: 'User',
      isShown: true,
      error: 'Invalid user',
      widthClass: 'th-25',
      regex: / /,
      isRef: {
        apiSection: 'applications',
        assignPropTo: 'userRef',
        propsList: ['email'],
        // only this matters
        mainProp: 'email',
      },
    },
    academicYear: {
      name: 'Academic year',
      isShown: true,
      error: 'Invalid year',
      widthClass: 'th-20',
      regex: applicationsRegex.academicYear,
    },
    form: {
      name: 'Form',
      isPdf: true,
      widthClass: 'th-15',
      isShown: true,
      error: 'Invalid form',
      regex: / /,
    },
    status: {
      name: 'Status',
      isShown: true,
      error: 'Invalid status',
      widthClass: 'th-15',
      regex: applicationsRegex.status,
    },
  },
};
