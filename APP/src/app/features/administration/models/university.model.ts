export interface UniversityDataDTO {
  code: string;
  name: string;
  address: string;
}

export interface UniversityBaseDTO {
  universityID: number;
  dataDTO: UniversityDataDTO;
}

export interface UniversityTableDTO extends UniversityDataDTO {
  universityID: number;
}
