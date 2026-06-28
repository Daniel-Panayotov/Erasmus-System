export type QueryParameter<T> = {
  field: T;
  value: string;
};

export type Parameter<T> = QueryParameter<T>;

export type InstitutionParamField = 'contactID' | 'institutionID';

export type InstitutionParameter = QueryParameter<InstitutionParamField>;
