import { adminModuleString } from './apiEnvironmentTypes';
import { widthClass } from './globalTypes';

export interface docsWithProperties {
  [doc: string]: docWithProperties;
}

export type docWithProperties = {
  [property: string]: docProperty;
};

export interface docProperty {
  name: string;
  error: string;
  regex: RegExp;
  widthClass: widthClass | null;
  isRef?: refProps;
}

export interface refProps {
  apiSection: adminModuleString;
  properties: { mainProp: string; propsList: string[] };
  assignPropTo: string;
}
