/**
 * Removes spaces and , from a string and replace them by hyphens
 */
export function normalizeRoutes(inputString: string): string {
  return inputString.replace(new RegExp(/[ ,.]/g), '-');
}
