import type { Auth } from "googleapis";
import { google } from "googleapis";
import gcpPrivateKey from "../../server/gcp-service-account-credentials.json";
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

let gcpCredentials: Auth.Credentials | undefined;
const sheetId = process.env.LEADS_SHEET_ID;
const sheets = google.sheets("v4");

const gcpClient = new google.auth.JWT(
  gcpPrivateKey.client_email,
  undefined,
  gcpPrivateKey.private_key,
  "https://www.googleapis.com/auth/spreadsheets"
);

interface Data {
  Company: string;
  numberOfEmployees: string;
  Industry: string;
  First_Name: string;
  Last_Name: string;
  Industry2: string;
  Email: string;
  Phone: string;
  date: string;
}
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const data = request.body as Data;

  if (
    !gcpCredentials ||
    (gcpCredentials.expiry_date && gcpCredentials.expiry_date > Date.now())
  ) {
    gcpCredentials = await gcpClient.authorize();
  }

  const values = [Object.values(data)];

  const spreadSheetPromise = sheets.spreadsheets.values.append({
    auth: gcpClient,
    spreadsheetId: sheetId,
    range: "website leads",
    valueInputOption: "RAW",
    requestBody: {
      values,
    },
  });

  await spreadSheetPromise;

  const { date, ...zohoData } = data;

  try {
    const accessTokenResponse = await axios.post(
      "https://accounts.zoho.com/oauth/v2/token",
      {},
      {
        params: {
          grant_type: "refresh_token",
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
          refresh_token: process.env.CLIENT_REFRESH_TOKEN_CODE,
        },
      }
    );

    const res = await axios.post(
      "https://www.zohoapis.com/crm/v6/Leads",
      {
        data: [zohoData],
      },
      {
        headers: {
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          Authorization: `Zoho-oauthtoken ${accessTokenResponse.data.access_token}`,
        },
      }
    );
    console.log(res);
    return response.status(200).end();
  } catch (error) {
    console.log("consumer lead error", error);
    return response.status(500).send({ error });
  }
}
