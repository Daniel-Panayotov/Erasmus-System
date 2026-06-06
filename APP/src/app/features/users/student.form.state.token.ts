import { InjectionToken } from '@angular/core';

export const STUDENT_FORM_STATE = new InjectionToken<STUDENT_FORM_STATE_MODEL>(
  'STUDENT_FORM_STATE',
);

export interface STUDENT_FORM_STATE_MODEL {
  isUpdate: boolean;
}
