export interface FileUploadEvent {
  state: 'SUCCESS' | 'ERROR' | 'SENDING';
  id: string;
}
