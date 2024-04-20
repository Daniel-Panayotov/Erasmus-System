import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { listDocProperties } from 'src/app/shared/environments/environment';
import { apiModuleString } from 'src/app/types/apiEnvironmentTypes';
import { FormValues, validatedFormValues } from 'src/app/types/popupFormValues';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  constructor() {}

  validateFormValues(
    form: FormGroup,
    apiModule: apiModuleString
  ): { error: boolean; validatedValues: validatedFormValues } {
    const formValues: FormValues = form.value;
    const validatedValues: validatedFormValues = {};
    let error = false;

    const docProperties = listDocProperties[apiModule];

    /* Index an object to get value names, to access the form values
     * Validate form values
     * Collect the form values if valid in "values"
     */
    for (let propertyName in docProperties) {
      if (
        !docProperties[propertyName].regex.exec(
          formValues[propertyName] as string
        )
      ) {
        error = true;
        break;
      }
      validatedValues[propertyName] = formValues[propertyName] as string;
    }

    return { error, validatedValues };
  }
}
