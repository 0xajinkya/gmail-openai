export function parseEmail(input: string) {
    // Regular expression to match the name and email
    const emailRegex = /^(.*)\s<(.+)>$/;
  
    // Trim the input to remove any leading or trailing whitespace
    input = input.trim();
  
    // Match the input string against the regex
    const match = input.match(emailRegex);
  
    // If a match is found, extract the name and email
    if (match) {
      const name = match[1].trim();
      const email = match[2].trim();
      return { name, email };
    } else {
      return input;
    }
  }