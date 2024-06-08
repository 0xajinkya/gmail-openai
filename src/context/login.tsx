"use client";

import {
  fetchUserInfo,
  generateAccessToken,
  generateLoginUrl,
  getAccessToken,
  getOpenAIAPIKey,
  setToLocalStorage,
} from "@/lib";
import { ILogin } from "@/utils";
import { useSearchParams, useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import {
  MouseEventHandler,
  ReactNode,
  createContext,
  useEffect,
  useState,
} from "react";

export const LoginContext = createContext<ILogin>({
  saveOpenAPIKey: () => {},
  handleLogin: () => {},
  loading: false,
});

export const LoginProvider = ({ children }: { children: ReactNode }) => {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const saveOpenAPIKey = (key: string) => {
    setToLocalStorage("openai-key", key);
    enqueueSnackbar({
      message: "OpenAI API saved successfully!",
      variant: "success",
    });
    location.replace("/");
    return;
  };

  const handleLogin: MouseEventHandler<HTMLButtonElement> = async (e) => {
    try {
      const url = await generateLoginUrl();
      window.open(url, "_self");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserData = async (code: string | null) => {
    setLoading(true);
    try {
      const accessToken = await generateAccessToken(code);
      const user = await fetchUserInfo(accessToken);
      setToLocalStorage("access-token", accessToken);
      setToLocalStorage("user", JSON.stringify(user));
      enqueueSnackbar({ message: "User logged in!", variant: "success" });
      router.replace("/login/add-api");
    } catch (error: any) {
      enqueueSnackbar({
        message: error.message,
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const accessToken = getAccessToken();
    const openAIKey = getOpenAIAPIKey();

    if (searchParams.get("code")) {
      fetchUserData(searchParams.get("code"));
    } else if (accessToken && openAIKey) {
      router.replace("/");
    } else if (accessToken && !openAIKey) {
      router.replace("/login/add-api");
    } else if (!accessToken && !openAIKey) {
      router.replace("/login");
    } else {
      return;
    }
  }, []);

  return (
    <LoginContext.Provider
      value={{
        saveOpenAPIKey,
        handleLogin,
        loading,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
