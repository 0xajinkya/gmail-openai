export const getAccessToken = () => {
  if (window) {
    const aT = localStorage.getItem("access-token");
    return aT === null ? false : aT;
  }
  return false;
};

export const getOpenAIAPIKey = () => {
  if (window) {
    const op = localStorage.getItem("openai-key");
    return op === null ? false : op;
  }
  return false;
};

export const getUser = () => {
  if (window) {
    const usr = localStorage.getItem("user");
    return usr === null ? false : JSON.parse(usr);
  }
  return false;
};
