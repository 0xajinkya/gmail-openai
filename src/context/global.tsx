"use client";

import { getAccessToken, getOpenAIAPIKey, getUser } from "@/lib";
import { useRouter } from "next/navigation";
import { ReactNode, createContext, useEffect, useState } from "react";

export interface IUser {
  name: string;
  email: string;
  picture: string;
}

interface IGlobal {
  user: IUser | boolean;
  accessToken: string | boolean;
  openAIAPI: string | boolean;
  logOut: () => void;
}

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
  const router = useRouter();

  useEffect(() => {
    setUser(getUser());
    setAccessToken(getAccessToken());
    setOpenAIAPI(getOpenAIAPIKey());
  }, []);

  const logOut = () => {
    localStorage.clear();
    setUser(false);
    setAccessToken(false);
    setOpenAIAPI(false);
    // router.refresh();
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
