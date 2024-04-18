import { FormGroup } from '@angular/forms';
import { adminRecordUnion, generalAdminComponentInputs } from './adminDocs';
import { colorClass, widthClass } from './globalTypes';

export type ButtonIdentifier = 'togglePopup' | 'deleteRecord';

export interface TableButtonBasicData {
  text: string;
  altText: string | null;
  showAltText: (i: number) => boolean;
  colorClass: colorClass;
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

export type ButtonBasicDataCollection = {
  [key in ButtonIdentifier]: TableButtonBasicData;
};

export type ButtonHandlerCollection = {
  [key in ButtonIdentifier]: (
    componentInputs: generalAdminComponentInputs
  ) => ButtonHandler;
};

export interface ButtonHandlerArguments {
  adminRecord: adminRecordUnion;
  index: number;
  adminPopupForm: FormGroup;
  isPopupEdit: boolean;
  [key: string]: adminRecordUnion | number | FormGroup | boolean;
}
