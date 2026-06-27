export type DeepFieldParameter<T> = {
  [K in keyof T & string]: {
    field: K;
    deeperField: T[K] extends object
      ? DeepFieldParameter<T[K]> | FieldParameter<T[K]>
      : FieldParameter<T[K]>;
  };
}[keyof T & string];

export type FieldParameter<T> = {
  [K in keyof T & string]: {
    field: K;
    value: T[K];
  };
}[keyof T & string];

export type Parameter<T> = FieldParameter<T> | DeepFieldParameter<T>;
