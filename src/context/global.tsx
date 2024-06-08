"use client";

import { clearLocalStorage, getAccessToken, getOpenAIAPIKey, getUser } from "@/lib";
import { IGlobal, IUser } from "@/utils";
import { ReactNode, createContext, useEffect, useState } from "react";

/**
 * Context for managing global state related to user authentication and API keys.
 */
export const GlobalContext = createContext<IGlobal>({
  user: false,
  accessToken: "",
  openAIAPI: "",
  logOut: () => {},
});

/**
 * Provides the global context to its children components.
 * @param {Object} props - The props for the GlobalProvider component.
 * @param {ReactNode} props.children - The children components to be wrapped by the provider.
 */
export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | boolean>(false);
  const [accessToken, setAccessToken] = useState<string | boolean>(false);
  const [openAIAPI, setOpenAIAPI] = useState<string | boolean>(false);

  useEffect(() => {
    setUser(getUser());
    setAccessToken(getAccessToken());
    setOpenAIAPI(getOpenAIAPIKey());
  }, []);

  /**
   * Logs out the user by clearing local storage and resetting state.
   */
  const logOut = () => {
    clearLocalStorage();
    setUser(false);
    setAccessToken(false);
    setOpenAIAPI(false);
  };

  return (
    <GlobalContext.Provider
      value={{
        user,
        accessToken,
        openAIAPI,
        logOut,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
