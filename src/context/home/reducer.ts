import { IEmail, TAction, TEmailCat } from "@/utils";
import { Reducer } from "react";

/**
 * Reducer function for managing email-related state changes.
 * @param {IEmail[]} state - The current state of emails.
 * @param {TAction} action - The action object representing the state change.
 * @returns {IEmail[]} - The new state of emails after applying the action.
 */
export const emailReducer: Reducer<IEmail[], TAction> = (
  state: IEmail[],
  action: TAction
) => {
  switch (action.type) {
    case "SET_EMAILS":
      // Set the emails with the payload value
      return [...action.payload.value] as IEmail[];
    case "CLASSIFY_EMAILS":
      // Map through emails and update their classifications based on the payload value
      return state.map((email, idx) => ({
        ...email,
        classification: action.payload.value[idx]
          .toString()
          .toLowerCase() as TEmailCat,
      }));
    default:
      // Return the current state if action type is not recognized
      return [...state] as IEmail[];
  }
};
