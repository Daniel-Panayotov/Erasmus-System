export interface ApplicationFormModel {
  mobilityType: string;

  studyFrom: Date | null;
  studyTo: Date | null;

  accommodation: boolean;
  accommodationFrom: Date | null;
  accommodationTo: Date | null;

  bulgarianCourse: boolean;
  motivationText: string;

  degree: string;

  priorStudyAbroad: boolean;
  priorStudyDurationMonths: number | null;
}
