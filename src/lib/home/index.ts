import { IEmail } from "@/utils";
import { parseEmail } from "../parse-email";
import OpenAI from "openai";

export const createDummyCats = (total: number) => {
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

export const fetchEmailsFromG = async (
  page: number,
  total: number,
  accessToken: string
) => {
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

export const refactorArray = (emails: IEmail[]) => {
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

export const initOpenAI = (openAIAPIKey: string) => {
  const openai = new OpenAI({
    apiKey: openAIAPIKey,
    dangerouslyAllowBrowser: true,
  });
  return openai;
};

export const gmailClassificationPrompt = (refactoredArray: any) => {
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
  `;
  return prompt;
};

export const generateClassification = async (
  openAIKey: string,
  prompt: string
) => {
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
