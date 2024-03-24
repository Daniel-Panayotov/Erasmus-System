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
  isRef?: string[];
}
