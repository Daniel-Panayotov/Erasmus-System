import { apiModuleString } from './apiEnvironmentTypes';
import { widthClass } from './globalTypes';

export type docsWithProperties = {
  [key in apiModuleString]: docWithProperties;
};

export type docWithProperties = {
  [property: string]: docProperty;
};

export interface docProperty {
  name: string;
  error: string;
  regex: RegExp;
  widthClass: widthClass | null;
  isShown: boolean;
  isRef?: refProps;
}

export interface refProps {
  apiSection: apiModuleString;
  properties: { mainProp: string; propsList: string[] };
  assignPropTo: string;
}
