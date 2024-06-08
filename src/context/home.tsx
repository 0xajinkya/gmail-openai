"use client";

import {
  Dispatch,
  ReactNode,
  Reducer,
  SetStateAction,
  createContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { IUser } from "./global";
import { getAccessToken, parseEmail } from "@/lib";
import { enqueueSnackbar } from "notistack";
import OpenAI from "openai";
import { OPENAI_API_KEY, OPENAI_ORG_ID } from "@/constants";

export interface IPHeader {
  name: string;
  value: string;
}

export interface IPParts {
  body: {
    size: number;
    data: string;
  };
  filename: string;
  headers: {
    name: string;
    value: string;
  }[];
  mimeType: string;
  partId: string;
}

export type EmailCat =
  | "important"
  | "promotions"
  | "social"
  | "marketing"
  | "spam"
  | "general";

export interface IEmailPayload {
  body: {
    size: number;
    data: string
  };
  filename: string;
  headers: IPHeader[];
  mimeType: string;
  partId: string;
  parts: IPParts[];
}
export interface IEmail {
  historyId: string;
  id: string;
  internalDate: string;
  labelIds: string[];
  payload: IEmailPayload;
  sizeEstimate: string;
  snippet: string;
  threadId: string;
  classification: null | EmailCat;
}
interface IHome {
  nextPage: () => void;
  prevPage: () => void;
  changeTotal: (tt: number) => void;
  total: number;
  emails: IEmail[];
  loading: boolean;
  page: number;
  classify: () => void;
  setActiveEmail: Dispatch<SetStateAction<IEmail | null>>;
  activeEmail: IEmail | null,
}

type FormAction = {
  type: "SET_EMAILS" | "CLASSIFY_EMAILS";
  payload: { key: string; value: IEmail[] | string[] };
};

const emailReducer: Reducer<IEmail[], FormAction> = (
  state: IEmail[],
  action: FormAction
) => {
  switch (action.type) {
    case "SET_EMAILS":
      return [...action.payload.value] as IEmail[];
    case "CLASSIFY_EMAILS":
      return state.map((email, idx) => ({
        ...email,
        classification: action.payload.value[idx]
          .toString()
          .toLowerCase() as EmailCat,
      }));
    default:
      return [...state] as IEmail[];
  }
};

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
  activeEmail: null
});

export const HomeProvider = ({ children }: { children: ReactNode }) => {
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(5);
  const [activeEmail, setActiveEmail] = useState<IEmail | null>(null);
  const [emails, emailsDispatch] = useReducer<Reducer<IEmail[], FormAction>>(
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
      const refactoredArray = emails.map((em) => {
        const nameNEmail = parseEmail(
          em.payload.headers.filter((vl) => vl.name === "From")[0].value
        );
        return {
          name: typeof nameNEmail === "string" ? nameNEmail : nameNEmail.name,
          email: typeof nameNEmail === "string" ? null : nameNEmail.email,
          subject: em.payload.headers.filter((vl) => vl.name === "Subject")[0]
            .value,
          snippet: em.snippet,
        };
      });
      console.log(refactoredArray);
      const openai = new OpenAI({
        organization: OPENAI_ORG_ID,
        apiKey: "sk-proj-fT2Tnp8zWlsnFVCaZZiJT3BlbkFJKa4EVs3NQE0ILZGzdsox",
        dangerouslyAllowBrowser: true,
      });
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `
        ${JSON.stringify(refactoredArray)}
      
      Take the above array and give me in what category out of the following each email fall in 
      Important, Promotion, Social, Marketing, General, Spam
      
      Give me the response as an array of the categories, where entry at a particular index will give the category that the email at that index falls in
      
      I only want response in this format and no other text ['Social', 'Promotions', ...] for all entries in the array
       For example the response for the following arrays would be
      
      
      [
          {
              name: "Upstox Daily",
              email: "noreply@campaigns.upstox.com",
              subject: "Wipro secures $500 mn order, Vedanta demerger receives creditor approval & more",
              snippet: "NIFTY IT (+3.3%) and NIFTY Auto (+2.5%) were the top sectoral gainers June 7, 2024 New highs Market recoup election result-day losses Daily upload Benchmark indices record strongest week of 2024 In all"
          },
          {
              name: "Medium",
              email: "hello@medium.com",
              subject: "The Edition: How to make remote work actually work",
              snippet: "Like many of you, remote work became a big part of my life in the spring of 2020. Four years later, I&#39;m still at a fully-remote company, but in some ways feel like I&#39;m only just at the"
          },
          {
              name: "Neeraj from Cutshort",
              email: "neeraj@info.cutshort.io",
              subject: "Unlock your career growth network with Voila.",
              snippet: "Hi AJINKYA, Quick tip - Unlock the full power of your career growth network via Voila, your professional assistant. What is Voila? An AI-powered assistant on WhatsApp, Voila is designed to help you tap"
          },
          {
              name: "DeepLearning.AI",
              email: "hello@deeplearning.ai",
              subject: "Hey there, discover top agentic AI courses!",
              snippet: "Learn how to build agents using crewAI, AutoGen, LangGraph, and more. View in browser DeepLearning.AI coral logo next to the word As Andrew Ng recently noted, &quot;AI agent workflows will drive"
          }
      ]
      
      
      ["General", "General", "Promotions", "Marketing"]
      `,
          },
        ],
        model: "gpt-4o",
      });
      // console.log(completion.choices[0]);
      const res = JSON.parse(completion.choices[0].message.content as string);
      emailsDispatch({
        type: "CLASSIFY_EMAILS",
        payload: {
          key: "CLASSIFY_EMAILS",
          value: res,
        },
      });
    } catch (error) {
      enqueueSnackbar({
        message:
          "Your API exceeded it's limit, please login again with new API key. We'll assign mock category to each email now!",
        variant: "error",
      });

      const categories = [
        "important",
        "promotion",
        "social",
        "marketing",
        "general",
        "spam",
      ];

      const arr = [];
      for (let i = 0; i < total; i++) {
        const randomIndex = Math.floor(Math.random() * categories.length);
        arr.push(categories[randomIndex]);
      }

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
        setLoading(true);
        const res = await fetch(
          `/api/fetch-emails?start=${page * total + 1}&end=${
            page * total + total
          }`,
          {
            headers: {
              "Access-Token": getAccessToken() as string,
            },
          }
        );
        const resBody = await res.json();
        console.log(resBody);
        emailsDispatch({
          type: "SET_EMAILS",
          payload: { key: "SET_EMAILS", value: resBody },
        });
      } catch (error) {
        enqueueSnackbar({
          message: "Access token expired, please login again!",
          variant: "error",
        });
        localStorage.clear();
        location.reload();
        location.replace("/login");
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
        activeEmail
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};
