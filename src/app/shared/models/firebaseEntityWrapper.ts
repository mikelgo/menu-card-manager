/**
 * Wrapper for documents coming from Firebase
 */
export interface FirebaseEntityWrapper<ID, T> {
  id: ID;
  value: T;
}
