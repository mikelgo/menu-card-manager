/**
 * Wrapper for documents coming from Firebase
 */
export interface Entity<ID, T> {
  id: ID;
  value: T;
}
