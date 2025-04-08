import type { NextApiRequest, NextApiResponse } from "next";
import FormData from "form-data";

const freshdeskFormURL =
  "https://axisappsupport.freshdesk.com/helpdesk/tickets.json";

interface Data {
  fullname: string;
  mobile: number;
  category: string;
  details: string;
  attachment: string;
}
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  console.log(request.body);
  const data = request.body as Data;

  const formData = new FormData();

  formData.append("fullname", data.fullname);
  formData.append("mobile", data.mobile);
  formData.append("category", data.category);
  formData.append("details", data.details);
  formData.append("attachment", data.attachment);

  try {
    await new Promise((resolve, reject) => {
      formData.submit(freshdeskFormURL, function (error, _res) {
        if (error) {
          return reject(error);
        }

        resolve(undefined);
      });
    });
    response.status(200).end();
  } catch (error) {
    console.log("business lead error", error);
    response.status(500).end();
  }
}
