export type QueryParameter<T> = {
  field: T;
  value: string;
};

export type Parameter<T> = QueryParameter<T>;

export type ContactParamField = 'contactID' | 'institutionID';

export type ContactParameter = QueryParameter<ContactParamField>;

export type UniversityParamField = 'facultyID';

export type UniversityParameter = QueryParameter<UniversityParamField>;
