import { IEmail } from "../interfaces";

export type TEmailCat =
  | "important"
  | "promotions"
  | "social"
  | "marketing"
  | "spam"
  | "general";

  export type TAction = {
    type: "SET_EMAILS" | "CLASSIFY_EMAILS";
    payload: { key: string; value: IEmail[] | string[] };
  };