/**
 * Represents a user with basic information.
 */
export interface IUser {
  /**
   * The name of the user.
   */
  name: string;

  /**
   * The email address of the user.
   */
  email: string;

  /**
   * The URL to the user's profile picture.
   */
  picture: string;
}

/**
 * Represents global application state.
 */
export interface IGlobal {
  /**
   * Represents the current user or if a user is logged in.
   * It can either be an object conforming to IUser interface or a boolean indicating user login status.
   */
  user: IUser | boolean;

  /**
   * Represents the access token for authentication purposes.
   * It can either be a string containing the access token or a boolean indicating authentication status.
   */
  accessToken: string | boolean;

  /**
   * Represents the URL to the OpenAI API.
   * It can either be a string containing the API URL or a boolean indicating API accessibility.
   */
  openAIAPI: string | boolean;

  /**
   * A function used to log out the user from the application.
   */
  logOut: () => void;
}
