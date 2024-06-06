import {
  OAUTH_CLIENT_ID,
  OAUTH_CLIENT_SECRET,
  OAUTH_REDIRECT_URL,
} from "@/constants";
import { google } from "googleapis";

export const oauth2ClientForLogin = new google.auth.OAuth2(
  OAUTH_CLIENT_ID,
  OAUTH_CLIENT_SECRET,
  OAUTH_REDIRECT_URL
);

export const oauth2Client = new google.auth.OAuth2();
