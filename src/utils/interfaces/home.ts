import { Dispatch, SetStateAction } from "react";
import { TEmailCat } from "../types";

/**
 * Represents a header in an email.
 */
export interface IPHeader {
    /**
     * The name of the header.
     */
    name: string;
    
    /**
     * The value of the header.
     */
    value: string;
}
  
/**
 * Represents parts of an email.
 */
export interface IPParts {
    /**
     * The body of the email part.
     */
    body: {
        /**
         * The size of the body.
         */
        size: number;
        
        /**
         * The data of the body.
         */
        data: string;
    };
    
    /**
     * The filename of the part.
     */
    filename: string;
    
    /**
     * The headers of the part.
     */
    headers: IPHeader[];
    
    /**
     * The MIME type of the part.
     */
    mimeType: string;
    
    /**
     * The ID of the part.
     */
    partId: string;
    
    /**
     * Optional sub-parts of the email part.
     */
    parts?: IPParts[];
}

/**
 * Represents the payload of an email.
 */
export interface IEmailPayload {
    /**
     * The body of the email.
     */
    body: {
        /**
         * The size of the body.
         */
        size: number;
        
        /**
         * The data of the body.
         */
        data: string;
    };
    
    /**
     * The filename of the email.
     */
    filename: string;
    
    /**
     * The headers of the email.
     */
    headers: IPHeader[];
    
    /**
     * The MIME type of the email.
     */
    mimeType: string;
    
    /**
     * The ID of the part.
     */
    partId: string;
    
    /**
     * The parts of the email.
     */
    parts: IPParts[];
}

/**
 * Represents an email.
 */
export interface IEmail {
    /**
     * The history ID of the email.
     */
    historyId: string;
    
    /**
     * The ID of the email.
     */
    id: string;
    
    /**
     * The internal date of the email.
     */
    internalDate: string;
    
    /**
     * The label IDs of the email.
     */
    labelIds: string[];
    
    /**
     * The payload of the email.
     */
    payload: IEmailPayload;
    
    /**
     * The size estimate of the email.
     */
    sizeEstimate: string;
    
    /**
     * The snippet of the email.
     */
    snippet: string;
    
    /**
     * The thread ID of the email.
     */
    threadId: string;
    
    /**
     * The classification of the email, if any.
     */
    classification: null | TEmailCat;
}

/**
 * Represents the home page.
 */
export interface IHome {
    /**
     * Function to navigate to the next page.
     */
    nextPage: () => void;
    
    /**
     * Function to navigate to the previous page.
     */
    prevPage: () => void;
    
    /**
     * Function to change the total number of items.
     */
    changeTotal: (tt: number) => void;
    
    /**
     * The total number of items.
     */
    total: number;
    
    /**
     * Array of emails.
     */
    emails: IEmail[];
    
    /**
     * Indicates whether data is loading.
     */
    loading: boolean;
    
    /**
     * The current page number.
     */
    page: number;
    
    /**
     * Function to classify emails.
     */
    classify: () => void;
    
    /**
     * Function to set the active email.
     */
    setActiveEmail: Dispatch<SetStateAction<IEmail | null>>;
    
    /**
     * The currently active email.
     */
    activeEmail: IEmail | null;
}
