/**
 * Defines a menu card.
 */
export interface MenuCardsCollection {
  uuid: string;
  /**
   * Reference to restaurant ID
   */
  restaurant: string;
  /**
   * Reference to the files
   */
  menuCards: string[];
}
