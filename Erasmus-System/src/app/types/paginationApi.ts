export interface IndexedApi {
  [key: string]: (params: action) => string;
}

type action = 'delete' | 'getPage' | 'getByParam' | 'updateOne' | 'createOne';
