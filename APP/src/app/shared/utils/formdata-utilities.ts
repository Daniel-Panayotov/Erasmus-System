export function toFormData(data: object, formData = new FormData(), parentKey = '') {
  for (const key of Object.keys(data)) {
    const value = (data as Record<string, unknown>)[key];
    const formKey = parentKey ? `${parentKey}.${key}` : key;

    if (value === null || value === undefined) continue;

    if (value instanceof File) {
      formData.append(formKey, value);
    } else if (value instanceof Date) {
      formData.append(formKey, value.toDateString());
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        const arrayKey = `${formKey}[${index}]`;
        if (item instanceof File) {
          formData.append(arrayKey, item);
        } else if (typeof item === 'object' && item !== null) {
          toFormData(item as Record<string, unknown>, formData, arrayKey);
        } else {
          formData.append(arrayKey, String(item));
        }
      });
    } else if (typeof value === 'object') {
      toFormData(value as Record<string, unknown>, formData, formKey);
    } else {
      formData.append(formKey, String(value));
    }
  }

  return formData;
}
