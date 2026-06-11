export interface ApplicationData {
  photo: File;
  mobilityType: string;
  studyFrom: Date;
  studyTo: Date;
  accommodation: boolean;
  accommodationFrom: Date | null;
  accommodationTo: Date | null;
  bulgarianCourse: boolean;
  motivationText: string;
  degree: string;
  priorStudyAbroad: boolean;
  priorStudyDuration: number | null;
}

export interface ApplicationExtendedData extends ApplicationData {
  sendingInstitution: number;
  receivingInstitution: number;
}

export type ApplicationFormModel = Omit<ApplicationData, 'photo' | 'studyFrom' | 'studyTo'> & {
  photo: File | null;
  studyFrom: Date | null;
  studyTo: Date | null;
};
