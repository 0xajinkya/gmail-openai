"use client";

import {
  ReactNode,
  Reducer,
  createContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import {
  clearLocalStorage,
  createDummyCats,
  fetchEmailsFromG,
  generateClassification,
  getAccessToken,
  getOpenAIAPIKey,
  getUser,
  gmailClassificationPrompt,
  refactorArray,
} from "@/lib";
import { enqueueSnackbar } from "notistack";
import { TAction, IEmail, IHome } from "@/utils";
import { emailReducer } from "./reducer";

export const HomeContext = createContext<IHome>({
  nextPage: () => {},
  prevPage: () => {},
  changeTotal: () => {},
  total: 5,
  emails: [],
  loading: false,
  page: 0,
  classify: () => {},
  setActiveEmail: () => {},
  activeEmail: null,
});

export const HomeProvider = ({ children }: { children: ReactNode }) => {
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(5);
  const [activeEmail, setActiveEmail] = useState<IEmail | null>(null);
  const [emails, emailsDispatch] = useReducer<Reducer<IEmail[], TAction>>(
    emailReducer,
    []
  );
  const [loading, setLoading] = useState(false);

  const nextPage = () => {
    setPage((pg) => ++pg);
  };

  const prevPage = () => {
    setPage((pg) => (pg === 0 ? pg : --pg));
  };

  const changeTotal = (tt: number) => {
    setTotal(() => tt);
  };

  const classify = async () => {
    try {
      const refactoredArray = refactorArray(emails);
      const prompt = gmailClassificationPrompt(refactoredArray);
      const res = await generateClassification(
        getOpenAIAPIKey() as string,
        prompt as string
      );
      emailsDispatch({
        type: "CLASSIFY_EMAILS",
        payload: {
          key: "CLASSIFY_EMAILS",
          value: res,
        },
      });
    } catch (error: any) {
      enqueueSnackbar({
        message: error.message,
        variant: "error",
      });
      const arr = createDummyCats(total);
      emailsDispatch({
        type: "CLASSIFY_EMAILS",
        payload: {
          key: "CLASSIFY_EMAILS",
          value: arr,
        },
      });
    }
  };

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        if (!getAccessToken() && !getUser()) {
          return;
        }
        setLoading(true);
        const resBody = await fetchEmailsFromG(
          page,
          total,
          getAccessToken() as string
        );
        console.log(resBody);
        emailsDispatch({
          type: "SET_EMAILS",
          payload: { key: "SET_EMAILS", value: resBody },
        });
      } catch (error: any) {
        enqueueSnackbar({
          message: error.message,
          variant: "error",
        });
        clearLocalStorage();
        location.reload();
      } finally {
        setLoading(false);
      }
    };
    fetchEmails();
  }, [page, total]);

  return (
    <HomeContext.Provider
      value={{
        nextPage,
        prevPage,
        changeTotal,
        total,
        emails,
        loading,
        page,
        classify,
        setActiveEmail,
        activeEmail,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};
