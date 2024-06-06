import { OAUTH_REDIRECT_URL, authScopes } from "@/constants";
import { oauth2ClientForLogin } from "@/lib";

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
