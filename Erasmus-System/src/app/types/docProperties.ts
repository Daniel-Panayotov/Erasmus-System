export type docProperties = {
  [key: string]: {
    [property: string]: docProperty;
  };
};

interface docProperty {
  name: string;
  error: string;
  regex: RegExp;
  class: string;
  isRef?: string[];
}
