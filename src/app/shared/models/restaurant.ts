import {Address} from './address';

/**
 * Defines a restaurant.
 */
export interface Restaurant {
  uuid: string;
  name: string;
  address?: Address;
}
