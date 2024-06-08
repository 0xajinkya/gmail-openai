import { OAUTH_REDIRECT_URL, authScopes } from "@/constants";
import { gmail_v1, google } from "googleapis";

// Initialize a new OAuth2 client
const oauth2Client = new google.auth.OAuth2();

/**
 * Retrieves a single message from the Gmail API.
 * @param gmail - The initialized Gmail API client.
 * @param messageId - The ID of the message to retrieve.
 * @returns The message object if found, otherwise null.
 */
async function getMessage(gmail: gmail_v1.Gmail, messageId: string) {
  try {
    // Get the message by ID
    const res = await gmail.users.messages.get({ userId: "me", id: messageId });
    const message = res.data;
    return message;
  } catch (error) {
    console.error(`An error occurred: ${error}`);
    return null;
  }
}

/**
 * Handler function for handling GET requests to retrieve Gmail messages.
 * @param req - The incoming request object.
 * @returns Response object with the requested messages.
 */
export const GET = async (req: Request): Promise<Response> => {
  try {
    // Extract access token from request headers
    const accessToken = req.headers.get("Access-Token");

    // Extract query parameters from request URL
    const { searchParams } = new URL(req.url);
    const start = Number(searchParams.get("start"));
    const end = Number(searchParams.get("end"));

    // Set OAuth2 credentials using the access token
    oauth2Client.setCredentials({ access_token: accessToken });

    // Initialize Gmail API client
    const gmail = google.gmail({ version: "v1", auth: oauth2Client });

    let emails = [];
    let nextPageToken = null;
    let currentIndex = 0;

    // Retrieve messages in batches until the requested range is covered
    while (emails.length < end - start + 1) {
      const res = (await gmail.users.messages.list({
        userId: "me",
        maxResults: 10,
        pageToken: nextPageToken,
      })) as any;

      if (res.data.messages && res.data.messages.length > 0) {
        const messages = res.data.messages;

        for (let i = 0; i < messages.length; i++) {
          if (currentIndex >= start && currentIndex <= end) {
            emails.push(messages[i]);
          }
          currentIndex++;
          if (emails.length >= end - start + 1) {
            break;
          }
        }
      }

      nextPageToken = res.data.nextPageToken;
      if (!nextPageToken) {
        break;
      }
    }

    // If no emails were found, return an empty array
    if (!emails.length) {
      return new Response(JSON.stringify([]), {
        status: 200
      });
    }

    // Retrieve the full message details for each email
    const allMessagesPromises = emails.map((msg) => getMessage(gmail, msg.id));
    const allMessages = await Promise.all(allMessagesPromises);

    // Return the retrieved messages in the response
    return new Response(JSON.stringify(allMessages), {
      status: 200,
    });
  } catch (error) {
    // If an error occurs during the process, return a 500 response
    return new Response("An error occurred", {
      status: 500,
    });
  }
};
