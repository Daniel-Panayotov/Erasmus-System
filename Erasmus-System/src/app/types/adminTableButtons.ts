import { FormGroup } from '@angular/forms';
import { generalAdminComponentInputs } from './adminDocs';
import { widthClass } from './docProperties';

export type ButtonIdentifier = 'togglePopup' | 'deleteRecord';

export interface TableButtonBasicData {
  text: string;
  altText: string | null;
  colorClass: string;
}

export type ButtonHandler = (
  data: ButtonHandlerArguments
) => void | Promise<void>;

export interface TableButtonsData {
  widthClass: widthClass;
  actions: TableButtonData[];
}

export interface TableButtonData extends TableButtonBasicData {
  handler: ButtonHandler;
}

export interface TableButtonGenerateArguments extends TableButtonBasicData {
  handlerIdentifier: ButtonIdentifier;
}

export type ButtonBasicDataCollection = {
  [key in ButtonIdentifier]: TableButtonBasicData;
};

export type ButtonHandlerCollection = {
  [key in ButtonIdentifier]: (
    componentInputs: generalAdminComponentInputs
  ) => ButtonHandler;
};

export interface ButtonHandlerArguments {
  id: string;
  index: number;
  adminPopupForm: FormGroup;
  isPopupEdit: boolean;
  [key: string]: string | number | FormGroup | boolean;
}
