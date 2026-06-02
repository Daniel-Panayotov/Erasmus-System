export interface ApplicationFormModel {
  mobilityType: MobilityType;

  studyFrom: Date;
  studyTo: Date;

  accommodation: boolean;
  accommodationFrom: Date | null;
  accommodationTo: Date | null;

  bulgarianCourse: boolean;
  motivationText: string | null;

  degree: Degree;

  priorStudyAbroad: boolean;
  priorStudyDurationMonths: number | null;
}

export enum Degree {
  Bachelor,
  Master,
}

export enum MobilityType {
  study,
  traineeship,
}
