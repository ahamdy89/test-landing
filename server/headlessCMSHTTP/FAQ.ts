import type { FAQAttributes } from "./types";
import axios from "axios";

async function getFAQs(
  locale: string,
  faqType?: string,
  signal?: AbortSignal
): Promise<{
  data: FAQAttributes[];
  count: number;
}> {
  let count = 0;
  const { data } = await axios.get<FAQAttributes[]>(
    `/faq/${locale}/${
      faqType?.includes("business") ? "business" : "personal"
    }.json`,
    {
      responseType: "json",
      headers: {
        "Content-Type": "application/json",
      },
      signal,
    }
  );
  count = data.length;

  return { data, count };
}

export { getFAQs };
