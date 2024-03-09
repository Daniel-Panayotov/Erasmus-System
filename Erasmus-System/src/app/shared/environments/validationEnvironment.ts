export const globalRegex = {
  emailRegex:
    /(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
  docId: /^[a-fA-F0-9]{24}$/,
};

export const fieldsRegex = {
  // 1-50 case-insensitive characters includes whitespaces, letters and diggits(only last, up to 3)
  formFieldNameSearch: /^([a-zA-Z\s]{1,50}(?:\d{1,3})?)|[0-9]{1,3}$/,
  fieldName: /^[a-zA-Z\s]{4,50}(?:\d{1,3})?$/ /* identical, but matches 4-50 */,
  formSelectSearch: /^(code|name)$/,
  code: /^(\d{3})$/,
};

export const facultiesRegex = {
  facultySearch:
    /^([a-zA-Z\s]{1,50}(?:\d{1,3})?)|[0-9]{1,3}$/ /* 1-50 characters includes whitespaces, letters and diggits(only last, up to 3)*/,
  facultyName: /^[a-zA-Z\s]{4,50}(?:\d{1,3})?$/,
  personName: /^[a-zA-Z\s]{4,20}$/,
  formSelectSearch: /^(name|coordinator)$/,
};

export const indexedSearchRegex: SearchIndex = {
  fields: (isSelect: boolean): RegExp => {
    return isSelect
      ? fieldsRegex.formSelectSearch
      : fieldsRegex.formFieldNameSearch;
  },
  faculties: (isSelect: boolean): RegExp => {
    return isSelect
      ? facultiesRegex.formSelectSearch
      : facultiesRegex.facultySearch;
  },
};

interface SearchIndex {
  [key: string]: (isSelect: boolean) => RegExp;
}
