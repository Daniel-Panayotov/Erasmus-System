import { adminSectionString } from './apiEnvironmentTypes';

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
  class: string;
  isRef?: refProps;
}

export interface refProps {
  apiSection: adminSectionString;
  properties: { mainProp: string; propsList: string[] };
  assignPropTo: string;
}
