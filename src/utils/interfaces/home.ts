import { Dispatch, SetStateAction } from "react";
import { TEmailCat } from "../types";

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
    parts?: IPParts[]
  }


  export interface IEmailPayload {
    body: {
      size: number;
      data: string;
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
    classification: null | TEmailCat;
  }

  export interface IHome {
    nextPage: () => void;
    prevPage: () => void;
    changeTotal: (tt: number) => void;
    total: number;
    emails: IEmail[];
    loading: boolean;
    page: number;
    classify: () => void;
    setActiveEmail: Dispatch<SetStateAction<IEmail | null>>;
    activeEmail: IEmail | null;
  }
  