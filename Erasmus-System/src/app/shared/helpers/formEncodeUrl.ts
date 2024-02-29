export function formEncodeUrl(baseUrl: string, params: any): string {
  let queryParams: string = '?';
  const newParams = Object.entries(params);

  //create string with query params
  newParams.map((val, i, arr) => {
    queryParams += `${val[0]}=${val[1]}&`;
  });

  //slice off the last & symbol
  queryParams = queryParams.slice(0, -1);
  const query = baseUrl + queryParams;

  return query;
}
