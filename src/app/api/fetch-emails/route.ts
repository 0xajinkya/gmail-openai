import { OAUTH_REDIRECT_URL, authScopes } from "@/constants";
import { gmail_v1, google } from "googleapis";

const oauth2Client = new google.auth.OAuth2();

async function getMessage(gmail: gmail_v1.Gmail, messageId: string) {
  try {
    // Get the message by ID
    const res = await gmail.users.messages.get({ userId: "me", id: messageId });
    const message = res.data;
    //console.log(`Message snippet: ${message.snippet}`);
    return message;
  } catch (error) {
    console.error(`An error occurred: ${error}`);
    return null;
  }
}

export const GET = async (req: Request) => {
  try {
    const accessToken = req.headers.get("Access-Token");

    const { searchParams } = new URL(req.url);

    const start = Number(searchParams.get("start"));
    const end = Number(searchParams.get("end"));

    oauth2Client.setCredentials({ access_token: accessToken });
    const gmail = google.gmail({ version: "v1", auth: oauth2Client });

    let emails = [];
    let nextPageToken = null;
    let currentIndex = 0;

    while (emails.length < end - start + 1) {
      const res = (await gmail.users.messages.list({
        userId: "me",
        maxResults: 10,
        pageToken: nextPageToken,
      })) as any;

      //console.log(res);

      if (res.data.messages && res.data.messages.length > 0) {
        const messages = res.data.messages;

        // Append messages to the email list if they are within the desired range
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
        break; // No more pages, exit loop
      }
    }

    if (!emails.length) {
      return new Response(JSON.stringify([]), {
        status: 200
      });
    }

    const allMessagesPromises = emails.map((msg) => getMessage(gmail, msg.id));
    const allMessages = await Promise.all(allMessagesPromises);
    return new Response(JSON.stringify(allMessages), {
      status: 200,
    });
  } catch (error) {
    //console.log(error);
    return new Response("An error occurred", {
      status: 500,
    });
  }
};
