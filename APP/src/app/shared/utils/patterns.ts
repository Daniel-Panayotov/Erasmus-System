export const Patterns = {
  /** /^[a-zA-Z\s]{1,50}$/ */
  textShort: /^[a-zA-Z\s]{1,50}$/,
  phoneNumber: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
  address: /^[A-Za-z0-9\s,'\-\.#\/]{5,120}$/,
  gender: /^(Male|Female)$/,
};

export const ApplicationPatterns = {
  mobilityType: /^(Study|Traineeship)$/,
  motivationText: /^[a-zA-Z0-9 ,.!?'"(){}[\]:;-]{0,500}$/,
  degree: /^(Bachelor|Master)$/,
};
