"use client";

import {
  OAUTH_CLIENT_ID,
  OAUTH_CLIENT_SECRET,
  OAUTH_REDIRECT_URL,
  OAUTH_TOKEN_URL,
  OAUTH_USERINFO_URL,
} from "@/constants";
import { getAccessToken, getOpenAIAPIKey } from "@/lib";
import { useSearchParams, useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import {
  MouseEventHandler,
  ReactNode,
  createContext,
  useEffect,
  useState,
} from "react";

interface ILogin {
  saveOpenAPIKey: (key: string) => void;
  handleLogin: MouseEventHandler<HTMLButtonElement> | undefined;
  loading: boolean;
}

export const LoginContext = createContext<ILogin>({
  saveOpenAPIKey: () => {},
  handleLogin: () => {},
  loading: false,
});

export const LoginProvider = ({ children }: { children: ReactNode }) => {
  const searchParams = useSearchParams();
  // const cookieStore = cookies();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const saveOpenAPIKey = (key: string) => {
    localStorage.setItem("openai-key", key);
    enqueueSnackbar({
      message: "OpenAI API saved successfully!",
      variant: "success",
    });
    location.replace("/");
    return;
  };

  const handleLogin: MouseEventHandler<HTMLButtonElement> = async (e) => {
    try {
      const res = await fetch("/api/gen-login-url", { method: "GET" });
      const resBody = await res.json();
      window.open(resBody.url, "_self");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserData = async (code: string | null) => {
    setLoading(true);
    const clientId = OAUTH_CLIENT_ID;
    const clientSecret = OAUTH_CLIENT_SECRET;
    const redirectUri = OAUTH_REDIRECT_URL;
    const tokenUrl = OAUTH_TOKEN_URL;
    const userInfoUrl = OAUTH_USERINFO_URL;

    const params = new URLSearchParams();
    if (code) {
      params.append("code", code);
      params.append("client_id", clientId as string);
      params.append("client_secret", clientSecret as string);
      params.append("redirect_uri", redirectUri as string);
      params.append("grant_type", "authorization_code");
    }
    try {
      const aTokenRes = await fetch(tokenUrl as string, {
        method: "POST",
        body: params,
      });
      if (!aTokenRes.ok) {
        throw new Error("Unable to complete authentication, try again!");
      }
      const aToken = await aTokenRes.json();

      const userRes = await fetch(userInfoUrl as string, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + aToken.access_token,
        },
        cache: "no-cache",
      });

      if (!userRes.ok) {
        throw new Error("Cannot fetch user information, try again!");
      }
      const user = await userRes.json();
      localStorage.setItem("access-token", aToken.access_token);
      localStorage.setItem("user", JSON.stringify(user));
      enqueueSnackbar({ message: "User logged in!", variant: "success" });
      router.replace("/login/add-api");
    } catch (error: any) {
      enqueueSnackbar({
        message: "Session expired, please try again",
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
