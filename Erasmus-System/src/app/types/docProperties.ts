import { adminSectionString } from './apiEnvironmentTypes';

export type docProperties = {
  [key: string]: {
    [property: string]: docProperty;
  };
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
