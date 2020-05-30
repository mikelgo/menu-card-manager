import {v1 as uuidv1} from 'uuid';

export function createUUID(): string {
  return uuidv1();
}
