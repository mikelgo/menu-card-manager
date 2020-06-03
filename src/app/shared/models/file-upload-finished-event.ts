export interface FileUploadFinishedEvent {
  state: 'SUCCESS' | 'ERROR';
  id: string;
}
