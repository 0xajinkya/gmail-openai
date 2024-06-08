import {
  OAUTH_CLIENT_ID,
  OAUTH_CLIENT_SECRET,
  OAUTH_REDIRECT_URL,
  OAUTH_TOKEN_URL,
  OAUTH_USERINFO_URL,
} from "@/constants";

/**
 * Generates the login URL for authentication.
 * @returns {Promise<string>} - A promise that resolves with the generated login URL.
 * @throws {Error} - Throws an error if the request fails.
 */
export const generateLoginUrl = async (): Promise<string> => {
  try {
      const res = await fetch("/api/gen-login-url", { method: "GET" });
      if (!res.ok) {
          throw new Error("Cannot complete request, please try again!");
      }
      const resBody = await res.json();
      return resBody.url;
  } catch (error) {
      throw new Error("Cannot complete request, please try again!");
  }
};

/**
* Creates parameters for authentication.
* @param {string | null} code - The authentication code.
* @returns {URLSearchParams} - The URLSearchParams object containing authentication parameters.
*/
export const createParamsForAuth = (code: string | null): URLSearchParams => {
  const clientId = OAUTH_CLIENT_ID;
  const clientSecret = OAUTH_CLIENT_SECRET;
  const redirectUri = OAUTH_REDIRECT_URL;

  const params = new URLSearchParams();
  if (code) {
      params.append("code", code);
      params.append("client_id", clientId as string);
      params.append("client_secret", clientSecret as string);
      params.append("redirect_uri", redirectUri as string);
      params.append("grant_type", "authorization_code");
  }
  return params;
};

/**
* Generates the access token for authentication.
* @param {string | null} code - The authentication code.
* @returns {Promise<string>} - A promise that resolves with the access token.
* @throws {Error} - Throws an error if the request fails.
*/
export const generateAccessToken = async (code: string | null): Promise<string> => {
  try {
      const tokenUrl = OAUTH_TOKEN_URL;
      const params = createParamsForAuth(code);

      const res = await fetch(tokenUrl as string, {
          method: "POST",
          body: params,
      });
      if (!res.ok) {
          throw new Error("Cannot complete request, please try again!");
      }
      const resBody = await res.json();
      return resBody.access_token;
  } catch (error) {
      throw new Error("Login failed, please try again!");
  }
};

/**
* Fetches user information using the access token.
* @param {string} accessToken - The access token.
* @returns {Promise<any>} - A promise that resolves with the user information.
* @throws {Error} - Throws an error if the request fails or if the user is invalid.
*/
export const fetchUserInfo = async (accessToken: string): Promise<any> => {
  try {
      const userInfoUrl = OAUTH_USERINFO_URL;

      const userRes = await fetch(userInfoUrl as string, {
          method: "GET",
          headers: {
              Authorization: "Bearer " + accessToken,
          },
          cache: "no-cache",
      });
      if (!userRes.ok) {
          throw new Error("Invalid user");
      }
      const uBody = await userRes.json();
      return uBody;
  } catch (error) {
      throw new Error("Login failed, please try again!");
  }
};
