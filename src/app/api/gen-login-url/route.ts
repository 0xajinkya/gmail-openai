import { OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET, OAUTH_REDIRECT_URL, authScopes } from "@/constants";
import { google } from "googleapis";

const oauth2ClientForLogin = new google.auth.OAuth2(
  OAUTH_CLIENT_ID,
  OAUTH_CLIENT_SECRET,
  OAUTH_REDIRECT_URL
);
// export const oauth2Client = new google.auth.OAuth2();


export async function GET(req: Request) {
  try {
    const url = oauth2ClientForLogin.generateAuthUrl({
      access_type: "offline",
      scope: authScopes,
      redirect_uri: OAUTH_REDIRECT_URL,
    });
    return new Response(
      JSON.stringify({
        url: url,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
}
