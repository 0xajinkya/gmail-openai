export const getAccessToken = () => {
  if (window) {
    const at = localStorage.getItem("access-token");
    return at === "undefined" ? false : at
  }
};

export const getOpenAPIKey = () => {
  if (window) {
    const oKey = localStorage.getItem("openai-key");
    return oKey === "undefined" ? false : oKey
  }
};
