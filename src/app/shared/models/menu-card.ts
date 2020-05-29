/**
 * Defines a menu card.
 */
export interface MenuCard {
  uuid: string;
  /**
   * File which holds the menu card. E.g. a PDF/.png/...
   */
  file: File;
  uploadDate: Date;
}
