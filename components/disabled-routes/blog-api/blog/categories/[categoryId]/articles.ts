import type { NextApiRequest, NextApiResponse } from "next";
import { getCategoryArticles } from "../../../../../../server/headlessCMSHTTP";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { categoryId } = request.query as { categoryId: string };
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

  const { data, count } = await getCategoryArticles({
    locale,
    categoryId: Number(categoryId),
    limit: Number(limit) || 10,
    offset: Number(offset) || 0,
    withCount: withCount == "true",
  });

  response.status(200).json({ data, count });
}
