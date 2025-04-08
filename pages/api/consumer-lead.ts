import type { Auth } from "googleapis";
import { google } from "googleapis";
import gcpPrivateKey from "../../server/gcp-service-account-credentials.json";
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const brazeBaseURL = process.env.LEADS_CONSUMER_BRAZE_URL!;
const apiKey = process.env.LEADS_CONSUMER_BRAZE_API_KEY!;

const gcpClient = new google.auth.JWT(
  gcpPrivateKey.client_email,
  undefined,
  gcpPrivateKey.private_key,
  "https://www.googleapis.com/auth/spreadsheets"
);

let gcpCredentials: Auth.Credentials | undefined;
const sheetId = process.env.LEADS_SHEET_ID;
const sheetName = process.env.LEADS_CONSUMER_SHEET_NAME;
const sheets = google.sheets("v4");

interface Data {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
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

  try {
    const spreadSheetPromise = sheets.spreadsheets.values.append({
      auth: gcpClient,
      spreadsheetId: sheetId,
      range: sheetName,
      valueInputOption: "RAW",
      requestBody: {
        values,
      },
    });

    // @see https://www.braze.com/docs/api/endpoints/user_data/post_user_track/#request-body
    const brazePromise = axios.post(
      `${brazeBaseURL}/users/track`,
      {
        attributes: [
          {
            _update_existing_only: false,
            first_name: data.firstName,
            last_name: data.lastName,
            phone: data.mobile,
            email: data.email,
            isWebsiteSubscriber: true,
            user_alias: {
              alias_label: "mobileNumber",
              alias_name: "002" + data.mobile,
            },
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    await Promise.all([spreadSheetPromise, brazePromise]);

    response.status(200).end();
  } catch (error) {
    console.log("consumer lead error", error);
    response.status(500).end();
  }
}
