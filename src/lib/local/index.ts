export const getAccessToken = () => {
  if (typeof window !== "undefined") {
    const aT = localStorage.getItem("access-token");
    return aT === null ? false : aT;
  }
  return false;
};

export const getOpenAIAPIKey = () => {
  if (typeof window !== "undefined") {
    const op = localStorage.getItem("openai-key");
    return op === null ? false : op;
  }
  return false;
};

export const getUser = () => {
  if (typeof window !== "undefined") {
    const usr = localStorage.getItem("user");
    return usr === null ? false : JSON.parse(usr);
  }
  return false;
};

export const setToLocalStorage = (
  key: "access-token" | "openai-key" | "user",
  value: string
) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, value);
  }
  return;
};

export const clearLocalStorage = () => {
  if (typeof window !== "undefined") {
    localStorage.clear();
  }
  return;
};
