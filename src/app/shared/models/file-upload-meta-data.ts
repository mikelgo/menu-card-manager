/**
 * Metadata which gets stored together with an uploaded file
 * used in {@link FileStorageService}.
 */
export interface FileUploadMetaData {
  /**
   * Reference to the file UUID
   */
  fileUUID?: string;
  /**
   * Size of the uploaded file in Byte
   */
  fileSize?: string;
  /**
   * Timestamp when the file was uploaded
   */
  uploadTimeStamp?: string;
  /**
   * Reference to {@link Restaurant} UUID associated with the file
   */
  restaurantRef?: string;
  /**
   * Reference to the {@link MenuCardsCollection} associated with the file
   */
  collectionRef?: string;

}
