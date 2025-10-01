import * as z from 'zod';

/**
 * Helper function to extract error message from Zod validation result
 * @param validationResult The result from safeParse
 * @param defaultErrorMessage Optional fallback message if no specific error found
 * @returns The error message string
 */
export function getValidationErrorMessage(validationResult: z.SafeParseError<any>, defaultErrorMessage: string = "Error: Invalid parameters"): string {
  return validationResult.error.issues[0]?.message || defaultErrorMessage;
}
