import { IEmail } from "@/utils";
import { parseEmail } from "../parse-email";
import OpenAI from "openai";

/**
 * Creates an array of dummy categories.
 * @param {number} total - The total number of categories to generate.
 * @returns {string[]} - An array containing dummy categories.
 */
export const createDummyCats = (total: number): string[] => {
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
  return arr;
};

/**
 * Fetches emails from a Gmail API endpoint.
 * @param {number} page - The page number.
 * @param {number} total - The total number of emails to fetch.
 * @param {string} accessToken - The access token for authentication.
 * @returns {Promise<any>} - A promise that resolves with the fetched emails.
 * @throws {Error} - Throws an error if the request fails.
 */
export const fetchEmailsFromG = async (
  page: number,
  total: number,
  accessToken: string
): Promise<any> => {
  try {
    const res = await fetch(
      `/api/fetch-emails?start=${page * total + 1}&end=${page * total + total}`,
      {
        headers: {
          "Access-Token": accessToken,
        },
      }
    );
    const resBody = await res.json();
    return resBody;
  } catch (error) {
    throw new Error("Access token expired, please login again!");
  }
};

/**
 * Refactors an array of emails to extract necessary information.
 * @param {IEmail[]} emails - The array of emails to refactor.
 * @returns {any[]} - The refactored array of emails.
 */
export const refactorArray = (emails: IEmail[]): any[] => {
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
  return refactoredArray;
};

/**
 * Initializes the OpenAI API with the provided API key.
 * @param {string} openAIAPIKey - The API key for the OpenAI API.
 * @returns {OpenAI} - An instance of the OpenAI API.
 */
export const initOpenAI = (openAIAPIKey: string): OpenAI => {
  const openai = new OpenAI({
    apiKey: openAIAPIKey,
    dangerouslyAllowBrowser: true,
  });
  return openai;
};

/**
 * Generates a prompt for Gmail email classification.
 * @param {any[]} refactoredArray - The array of refactored emails.
 * @returns {string} - The generated prompt for email classification.
 */
export const gmailClassificationPrompt = (refactoredArray: any[]): string => {
  const prompt = `
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
          snippet: "Hi AJINKYA, Quick tip - Unlock the full
          part of your career growth network via Voila, your professional assistant. What is Voila? An AI-powered assistant on WhatsApp, Voila is designed to help you tap"
        },
        {
            name: "DeepLearning.AI",
            email: "hello@deeplearning.ai",
            subject: "Hey there, discover top agentic AI courses!",
            snippet: "Learn how to build agents using crewAI, AutoGen, LangGraph, and more. View in browser DeepLearning.AI coral logo next to the word As Andrew Ng recently noted, &quot;AI agent workflows will drive"
        }
    ]
    
    
    ["General", "General", "Promotions", "Marketing"]
    `;
  return prompt;
};

/**
 * Generates email classification using the OpenAI API.
 * @param {string} openAIKey - The API key for the OpenAI API.
 * @param {string} prompt - The prompt for email classification.
 * @returns {Promise<string[]>} - A promise that resolves with the generated classification.
 * @throws {Error} - Throws an error if the request fails.
 */
export const generateClassification = async (
  openAIKey: string,
  prompt: string
): Promise<string[]> => {
  try {
    const openai = initOpenAI(openAIKey as string);
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: prompt,
        },
      ],
      model: "gpt-4o",
    });

    const res = JSON.parse(completion.choices[0].message.content as string);
    return res;
  } catch (error) {
    throw new Error(
      "Your API exceeded it's limit, please login again with new API key. We'll assign mock category to each email now!"
    );
  }
};
