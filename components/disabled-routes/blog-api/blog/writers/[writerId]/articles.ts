import type { NextApiRequest, NextApiResponse } from "next";
import { getWriterArticles } from "../../../../../../server/headlessCMSHTTP";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { writerId } = request.query as { writerId: string };
  const {
    locale = "en",
    limit,
    offset,
    withCount,
  } = request.query as {
    locale?: string;
    writerId?: string;
    limit?: string;
    offset?: string;
    withCount?: "true" | "false";
  };

  const { data, count } = await getWriterArticles({
    locale,
    writerId: Number(writerId),
    limit: Number(limit) || 10,
    offset: Number(offset) || 0,
    withCount: withCount == "true",
  });

  response.status(200).json({ data, count });
}
