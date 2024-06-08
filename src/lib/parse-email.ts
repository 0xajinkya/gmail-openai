/**
 * Parses an email string to extract the name and email address.
 * @param {string} input - The input email string to parse.
 * @returns {{ name: string, email: string } | string} - An object containing the name and email if parsing is successful, or the original input string if parsing fails.
 */
export function parseEmail(input: string): { name: string, email: string } | string {
  const emailRegex = /^(.*)\s<(.+)>$/;
  input = input.trim();
  const match = input.match(emailRegex);
  if (match) {
      const name = match[1].trim();
      const email = match[2].trim();
      return { name, email };
  } else {
      return input;
  }
}
