import { IEmail, TAction, TEmailCat } from "@/utils";
import { Reducer } from "react";

export const emailReducer: Reducer<IEmail[], TAction> = (
    state: IEmail[],
    action: TAction
  ) => {
    switch (action.type) {
      case "SET_EMAILS":
        return [...action.payload.value] as IEmail[];
      case "CLASSIFY_EMAILS":
        return state.map((email, idx) => ({
          ...email,
          classification: action.payload.value[idx]
            .toString()
            .toLowerCase() as TEmailCat,
        }));
      default:
        return [...state] as IEmail[];
    }
  };