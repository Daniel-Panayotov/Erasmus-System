import { FormGroup } from '@angular/forms';
import { adminRecordUnion, generalAdminComponentInputs } from './adminDocs';
import { bgColorClass, widthClass } from './globalTypes';

export type ButtonIdentifier =
  | 'togglePopup'
  | 'deleteRecord'
  | 'approveApplication'
  | 'rejectApplication';

export interface TableButtonBasicData {
  text: string;
  altText: string | null;
  showAltText: (i: number) => boolean;
  bgColorClass: bgColorClass;
}

export type ButtonHandler = (
  data: ButtonHandlerArguments
) => void | Promise<void>;

export interface TableButtonsData {
  widthClass: widthClass;
  actions: TableButtonsDataActions;
}

export interface TableButtonsDataActions {
  editButtonIndex: number;
  buttons: TableButtonData[];
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
  cookie: string;
  [key: string]: adminRecordUnion | number | FormGroup | boolean | string;
}

export type updateData = {
  [key: string]: string;
};
