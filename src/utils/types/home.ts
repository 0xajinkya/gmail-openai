import { IEmail } from "../interfaces";

/**
 * Represents the category of an email.
 */
export type TEmailCat =
  | "important"
  | "promotions"
  | "social"
  | "marketing"
  | "spam"
  | "general";

/**
 * Represents an action type for email-related actions.
 */
export type TAction = {
  /**
   * The type of action.
   */
  type: "SET_EMAILS" | "CLASSIFY_EMAILS";
  /**
   * The payload containing a key and its corresponding value.
   */
  payload: { key: string; value: IEmail[] | string[] };
};
