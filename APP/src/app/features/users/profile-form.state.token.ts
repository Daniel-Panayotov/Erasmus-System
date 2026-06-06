import { InjectionToken } from '@angular/core';

export const PROFILE_FORM_STATE = new InjectionToken<PROFILE_FORM_STATE_MODEL>(
  'PROFILE_FORM_STATE',
);

export interface PROFILE_FORM_STATE_MODEL {
  isUpdate: boolean;
}
