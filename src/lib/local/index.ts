/**
 * Retrieves the access token from localStorage if available.
 * @returns {string | false} - The access token if available, otherwise false.
 */
export const getAccessToken = (): string | false => {
  if (typeof window !== "undefined") {
      const aT = localStorage.getItem("access-token");
      return aT === null ? false : aT;
  }
  return false;
};

/**
* Retrieves the OpenAI API key from localStorage if available.
* @returns {string | false} - The OpenAI API key if available, otherwise false.
*/
export const getOpenAIAPIKey = (): string | false => {
  if (typeof window !== "undefined") {
      const op = localStorage.getItem("openai-key");
      return op === null ? false : op;
  }
  return false;
};

/**
* Retrieves the user object from localStorage if available.
* @returns {any | false} - The user object if available, otherwise false.
*/
export const getUser = (): any | false => {
  if (typeof window !== "undefined") {
      const usr = localStorage.getItem("user");
      return usr === null ? false : JSON.parse(usr);
  }
  return false;
};

/**
* Sets a key-value pair to localStorage.
* @param {string} key - The key to set.
* @param {string} value - The value to set.
*/
export const setToLocalStorage = (key: "access-token" | "openai-key" | "user", value: string): void => {
  if (typeof window !== "undefined") {
      localStorage.setItem(key, value);
  }
};

/**
* Clears all items from localStorage.
*/
export const clearLocalStorage = (): void => {
  if (typeof window !== "undefined") {
      localStorage.clear();
  }
};
