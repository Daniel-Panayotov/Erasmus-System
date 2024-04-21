import { apiModuleString } from 'src/app/types/apiEnvironmentTypes';

export interface ApplicationFormModel {
  [key: string]: applicationSection;
}

export interface applicationSection {
  sectionName: string;
  sectionData: sectionData[];
}

export type sectionData = {
  text: string;
  properties: {
    separator: string;
    list: string[];
    isImg?: boolean;
    isRef?: {
      apiModule: apiModuleString;
      mainProp: string;
      list: string[];
    };
  };
};

export const applicationFormModel: ApplicationFormModel = {
  metaData: {
    sectionName: 'ERASMUS STUDENT APPLICATION FORM',
    sectionData: [
      {
        text: 'Academic year',
        properties: {
          separator: ' - ',
          list: ['academicYearFrom', 'academicYearTo'],
        },
      },
      {
        text: 'Type of mobility',
        properties: {
          separator: '',
          list: ['mobilityType'],
        },
      },
      {
        text: 'Semester',
        properties: {
          separator: '',
          list: ['semesterSeason'],
        },
      },
      {
        text: 'Field of study (subject area code)',
        properties: {
          separator: ', ',
          list: ['fieldOfStudyRef'],
          isRef: {
            apiModule: 'fields',
            mainProp: 'code',
            list: ['code', 'name'],
          },
        },
      },
    ],
  },
  studentData: {
    sectionName: "STUDENT'S PERSONAL DATA",
    sectionData: [
      {
        text: '',
        properties: {
          separator: '',
          isImg: true,
          list: ['file'],
        },
      },
      {
        text: 'First name',
        properties: {
          separator: '',
          list: ['firstName'],
        },
      },
      {
        text: 'Family name',
        properties: {
          separator: '',
          list: ['lastName'],
        },
      },
      {
        text: 'Date and place of birth',
        properties: {
          separator: ', ',
          list: ['birthDate', 'birthPlace'],
        },
      },
      {
        text: 'Sex',
        properties: {
          separator: '',
          list: ['sex'],
        },
      },
      {
        text: 'Nationality',
        properties: {
          separator: '',
          list: ['nationality'],
        },
      },
      {
        text: 'Current Address',
        properties: {
          separator: '',
          list: ['address'],
        },
      },
      {
        text: 'Telephone number',
        properties: {
          separator: '',
          list: ['phone'],
        },
      },
    ],
  },
  sendingInstitution: {
    sectionName: 'SENDING INSTITUTION',
    sectionData: [
      {
        text: 'Erasmus code',
        properties: {
          separator: '',
          list: ['mobilityRef'],
          isRef: {
            apiModule: 'mobilities',
            mainProp: 'code',
            list: ['code'],
          },
        },
      },
      {
        text: 'Name',
        properties: {
          separator: '',
          list: ['mobilityRef'],
          isRef: {
            apiModule: 'mobilities',
            mainProp: 'code',
            list: ['university'],
          },
        },
      },
      {
        text: 'Full address',
        properties: {
          separator: '',
          list: ['mobilityRef'],
          isRef: {
            apiModule: 'mobilities',
            mainProp: 'code',
            list: ['address'],
          },
        },
      },
      {
        text: 'Faculty',
        properties: {
          separator: '',
          list: ['sendingFaculty'],
        },
      },
      {
        text: 'Contact person',
        properties: {
          separator: ' ',
          list: ['sendingContactRef'],
          isRef: {
            apiModule: 'foreignContacts',
            mainProp: 'email',
            list: ['firstName', 'lastName', 'email'],
          },
        },
      },
      {
        text: 'Institutional erasmus coordinator',
        properties: {
          separator: ' ',
          list: ['mobilityRef'],
          isRef: {
            apiModule: 'mobilities',
            mainProp: 'code',
            list: ['coordinator'],
          },
        },
      },
    ],
  },
  receivingInstitution: {
    sectionName: 'RECEIVING INSTITUTION',
    sectionData: [
      {
        text: 'Erasmus code',
        properties: {
          separator: '',
          list: ['receivingErasmusCode'],
        },
      },
      {
        text: 'University name',
        properties: {
          separator: '',
          list: ['receivingUniName'],
        },
      },
      {
        text: 'Address',
        properties: {
          separator: '',
          list: ['receivingUniAddress'],
        },
      },
      {
        text: 'Faculty',
        properties: {
          separator: ' ',
          list: ['receivingFacultyRef'],
          isRef: {
            apiModule: 'faculties',
            mainProp: 'name',
            list: ['name'],
          },
        },
      },
      {
        text: 'Contact person',
        properties: {
          separator: ' ',
          list: ['receivingContactRef'],
          isRef: {
            apiModule: 'receivingContacts',
            mainProp: 'email',
            list: ['firstName', 'lastName', 'email'],
          },
        },
      },
      {
        text: 'Period of study/traineeship',
        properties: {
          separator: ' - ',
          list: ['studyFrom', 'studyTo'],
        },
      },
    ],
  },
  accomodation: {
    sectionName: 'ACCOMOMODATION',
    sectionData: [
      {
        text: 'Wishes for accommodation in the halls of residence',
        properties: {
          separator: '',
          list: ['accommodation'],
        },
      },
      {
        text: 'Period of stay',
        properties: {
          separator: ' - ',
          list: ['stayFrom', 'stayTo'],
        },
      },
    ],
  },
  languageCourse: {
    sectionName: 'BULGARIAN LANGUAGE COURSE',
    sectionData: [
      {
        text: 'Wishes to attend bulgarian language course(60h)',
        properties: {
          separator: '',
          list: ['bulgarianCourse'],
        },
      },
    ],
  },
  reasonToStudy: {
    sectionName: 'REASON TO STUDY ABROAD',
    sectionData: [
      {
        text: '',
        properties: {
          separator: '',
          list: ['visitReason'],
        },
      },
    ],
  },
  languageCompetence: {
    sectionName: 'LANGUAGE COMPETENCE',
    sectionData: [
      {
        text: 'Mother language',
        properties: {
          separator: '',
          list: ['motherLanguage'],
        },
      },
      {
        text: 'Home language',
        properties: {
          separator: '',
          list: ['homeLanguage'],
        },
      },
    ],
  },
  prevCurrStudy: {
    sectionName: 'PREVIOUS AND CURRENT STUDY',
    sectionData: [
      {
        text: 'Degree currently studying for',
        properties: {
          separator: '',
          list: ['studyDegree'],
        },
      },
      {
        text: 'Number of higher education years prior to departure abroad',
        properties: {
          separator: '',
          list: ['studyYears'],
        },
      },
      {
        text: 'Studied abroad before',
        properties: {
          separator: '',
          list: ['priorStudyErasmus'],
        },
      },
      {
        text: 'Number of months of Erasmus study, during current degree',
        properties: {
          separator: '',
          list: ['priorStudyMonths'],
        },
      },
    ],
  },
};
