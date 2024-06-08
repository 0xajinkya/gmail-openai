"use client";

import {
  clearLocalStorage,
  getAccessToken,
  getOpenAIAPIKey,
  getUser,
} from "@/lib";
import { IGlobal, IUser } from "@/utils";
import { ReactNode, createContext, useEffect, useState } from "react";

export const GlobalContext = createContext<IGlobal>({
  user: false,
  accessToken: "",
  openAIAPI: "",
  logOut: () => {},
});

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | boolean>(false);
  const [accessToken, setAccessToken] = useState<string | boolean>(false);
  const [openAIAPI, setOpenAIAPI] = useState<string | boolean>(false);

  useEffect(() => {
    setUser(getUser());
    setAccessToken(getAccessToken());
    setOpenAIAPI(getOpenAIAPIKey());
  }, []);

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
