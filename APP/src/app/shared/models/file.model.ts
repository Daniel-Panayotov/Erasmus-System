export interface FileDataDTO {
  fileName: string;
  contentType: string;
  fileSize: number;
}

export interface FileBaseDTO {
  fileID: number;
  dataDTO: FileDataDTO;
}
