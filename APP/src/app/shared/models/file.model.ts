export interface FileData {
  fileName: string;
  contentType: string;
  fileSize: number;
}

export interface FileBase extends FileData {
  fileID: number;
}
