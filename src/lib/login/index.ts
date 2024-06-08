import {
  OAUTH_CLIENT_ID,
  OAUTH_CLIENT_SECRET,
  OAUTH_REDIRECT_URL,
  OAUTH_TOKEN_URL,
  OAUTH_USERINFO_URL,
} from "@/constants";

export const generateLoginUrl = async () => {
  try {
    const res = await fetch("/api/gen-login-url", { method: "GET" });
    if (!res.ok) {
      throw new Error("Cannot complete request, please try again!");
    }
    const resBody = await res.json();
    return resBody.url;
  } catch (error) {
    throw new Error("Cannot complete request, please try again!");
  }
};

export const createParamsForAuth = (code: string | null) => {
  const clientId = OAUTH_CLIENT_ID;
  const clientSecret = OAUTH_CLIENT_SECRET;
  const redirectUri = OAUTH_REDIRECT_URL;

  const params = new URLSearchParams();
  if (code) {
    params.append("code", code);
    params.append("client_id", clientId as string);
    params.append("client_secret", clientSecret as string);
    params.append("redirect_uri", redirectUri as string);
    params.append("grant_type", "authorization_code");
  }
  return params;
};

export const generateAccessToken = async (code: string | null) => {
  try {
    const tokenUrl = OAUTH_TOKEN_URL;
    const params = createParamsForAuth(code);

    const res = await fetch(tokenUrl as string, {
      method: "POST",
      body: params,
    });
    if (!res.ok) {
      throw new Error("Cannot complete request, please try again!");
    }
    const resBody = await res.json();
    return resBody.access_token;
  } catch (error) {
    throw new Error("Login failed, please try again!");
  }
};

export const fetchUserInfo = async (accessToken: string) => {
  try {
    const userInfoUrl = OAUTH_USERINFO_URL;

    const userRes = await fetch(userInfoUrl as string, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
      cache: "no-cache",
    });
    if(!userRes.ok){
        throw new Error("Invalid user");
    }
    const uBody = await userRes.json();
    return uBody;
  } catch (error) {
    throw new Error("Login failed, please try again!");
  }
};
