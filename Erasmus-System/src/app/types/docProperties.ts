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
  widthClass: widthClass | null;
  isRef?: refProps;
}

export interface refProps {
  apiSection: adminSectionString;
  properties: { mainProp: string; propsList: string[] };
  assignPropTo: string;
}

export type widthClass =
  | 'th-10'
  | 'th-15'
  | 'th-20'
  | 'th-25'
  | 'th-30'
  | 'th-35'
  | 'th-40'
  | 'th-50'
  | 'th-60';
