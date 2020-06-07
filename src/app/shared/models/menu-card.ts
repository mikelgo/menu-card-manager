export interface MenuCard {
  uuid: string;
  /**
   * Name which will be displayed, e.g. CW10 or June 2020
   */
  displayName: string;
  /**
   * Reference to the File-ID which holds the menu card. E.g. a PDF/.png/...
   */
  mediaRef: string;
  uploadDate?: string;
}
