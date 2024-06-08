import { OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET, OAUTH_REDIRECT_URL, authScopes } from "@/constants";
import { google } from "googleapis";

// Create an OAuth2 client for handling Google OAuth login
const oauth2ClientForLogin = new google.auth.OAuth2(
  OAUTH_CLIENT_ID,
  OAUTH_CLIENT_SECRET,
  OAUTH_REDIRECT_URL
);

/**
 * Handler function for handling GET requests to initiate Google OAuth login.
 * @param req - The incoming request object.
 * @returns Response object with the authentication URL.
 */
export async function GET(req: Request): Promise<Response> {
  try {
    // Generate authentication URL with specified access type, scope, and redirect URI
    const url = oauth2ClientForLogin.generateAuthUrl({
      access_type: "offline",
      scope: authScopes,
      redirect_uri: OAUTH_REDIRECT_URL,
    });

    // Return a response with the authentication URL
    return new Response(
      JSON.stringify({
        url: url,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    // Log and throw any errors that occur during the authentication process
    console.log(error);
    return new Response("Some error occurred", {
      status: 400
    })
  }
}
