import type {
  BlogRecord,
  ArticleAttributes,
  CategoryAttributes,
  WriterAttributes,
} from "./types";
import instance from "./instance";

type GetFeaturedArticleResult = BlogRecord<
  Pick<
    ArticleAttributes,
    "locale" | "title" | "read_time_json" | "cover_photo" | "updatedAt"
  > & {
    category: { data: null | BlogRecord<Pick<CategoryAttributes, "title">> };
    writer: {
      data: null | BlogRecord<Pick<WriterAttributes, "full_name" | "photo">>;
    };
    localizations: {
      data: Array<BlogRecord<Pick<ArticleAttributes, "locale">>>;
    };
  }
>;
async function getFeaturedArticle(
  locale: string
): Promise<GetFeaturedArticleResult | null> {
  const articleParams = {
    fields: ["locale", "title", "read_time_json", "updatedAt"],
    populate: {
      cover_photo: {
        fields: ["*"],
      },
      category: {
        fields: ["title"],
      },
      writer: {
        fields: ["full_name"],
        populate: ["photo"],
      },
      localizations: {
        fields: ["locale"],
      },
    },
  };

  const {
    data: {
      data: {
        attributes: {
          article: { data: featuredArticle },
        },
      },
    },
  } = await instance.get<{
    data: {
      attributes: { article: { data: GetFeaturedArticleResult | null } };
    };
  }>("/featured-article", {
    params: {
      populate: {
        article: articleParams,
      },
    },
  });

  if (!featuredArticle) {
    return null;
  }

  if (featuredArticle.attributes.locale == locale) {
    return featuredArticle;
  }

  const articleWithCorrectLocale =
    featuredArticle.attributes.localizations.data.find(
      (articleWithOtherLocale) =>
        articleWithOtherLocale.attributes.locale == locale
    );

  if (!articleWithCorrectLocale) {
    return null;
  }

  const {
    data: { data: featuredArticleWithCorrectLocale },
  } = await instance.get<{
    data: GetFeaturedArticleResult | null;
  }>(`/articles/${articleWithCorrectLocale.id}`, {
    params: articleParams,
  });

  return featuredArticleWithCorrectLocale;
}

type GetCategoryArticlesArgs = {
  locale: string;
  categoryId: number;
  limit?: number;
  offset?: number;
  withCount?: boolean;
  signal?: AbortSignal;
};
type GetCategoryArticlesResult = {
  data: Array<
    BlogRecord<
      Pick<
        ArticleAttributes,
        "title" | "read_time_json" | "cover_photo" | "updatedAt"
      > & {
        writer: {
          data: null | BlogRecord<
            Pick<WriterAttributes, "full_name" | "photo">
          >;
        };
      }
    >
  >;
  count: number | undefined;
};
async function getCategoryArticles({
  locale,
  categoryId,
  limit = 10,
  offset = 0,
  withCount = false,
  signal,
}: GetCategoryArticlesArgs): Promise<GetCategoryArticlesResult> {
  const {
    data: {
      data: articles,
      meta: {
        pagination: { total },
      },
    },
  } = await instance.get<{
    data: GetCategoryArticlesResult["data"];
    meta: { pagination: { total: number } };
  }>("/articles", {
    params: {
      locale,
      fields: ["title", "read_time_json", "updatedAt"],
      populate: {
        cover_photo: {
          fields: ["*"],
        },
        writer: {
          fields: ["full_name"],
          populate: ["photo"],
        },
      },
      filters: {
        category: {
          id: {
            $eq: categoryId,
          },
        },
      },
      sort: "updatedAt:desc",
      pagination: {
        start: offset,
        limit,
        withCount,
      },
    },
    signal,
  });

  return { data: articles, count: total };
}

type GetWriterArticlesArgs = {
  locale: string;
  writerId: number;
  limit?: number;
  offset?: number;
  withCount?: boolean;
  signal?: AbortSignal;
};
type GetWriterArticlesResult = {
  data: Array<
    BlogRecord<
      Pick<
        ArticleAttributes,
        "title" | "read_time_json" | "cover_photo" | "updatedAt"
      > & {
        writer: {
          data: null | BlogRecord<
            Pick<WriterAttributes, "full_name" | "photo">
          >;
        };
      }
    >
  >;
  count: number | undefined;
};
async function getWriterArticles({
  locale,
  writerId,
  limit = 10,
  offset = 0,
  withCount = false,
  signal,
}: GetWriterArticlesArgs): Promise<GetWriterArticlesResult> {
  const {
    data: {
      data: writers,
      meta: {
        pagination: { total },
      },
    },
  } = await instance.get<{
    data: GetWriterArticlesResult["data"];
    meta: { pagination: { total: number | undefined } };
  }>("/articles", {
    params: {
      locale,
      fields: ["title", "read_time_json", "updatedAt"],
      populate: {
        cover_photo: {
          fields: ["*"],
        },
        writer: {
          fields: ["full_name"],
          populate: ["photo"],
        },
      },
      filters: {
        writer: {
          id: {
            $eq: writerId,
          },
        },
      },
      sort: "updatedAt:desc",
      pagination: {
        start: offset,
        limit,
        withCount,
      },
    },
    signal,
  });

  return { data: writers, count: total };
}

type GetArticleByIdResult = BlogRecord<
  ArticleAttributes & {
    writer: {
      data: null | BlogRecord<Pick<WriterAttributes, "full_name" | "photo">>;
    };
    localizations: {
      data: Array<BlogRecord<Pick<ArticleAttributes, "locale">>>;
    };
  }
>;
async function getArticleById(
  id: number
): Promise<GetArticleByIdResult | null> {
  const {
    data: { data: article },
  } = await instance.get<{ data: GetArticleByIdResult }>(`/articles/${id}`, {
    params: {
      fields: ["*"],
      populate: {
        cover_photo: {
          fields: ["*"],
        },
        writer: {
          fields: ["full_name"],
          populate: ["photo"],
        },
        localizations: {
          fields: ["locale"],
        },
      },
    },
  });

  return article || null;
}

export type {
  GetFeaturedArticleResult,
  GetCategoryArticlesResult,
  GetWriterArticlesResult,
  GetArticleByIdResult,
};
export {
  getFeaturedArticle,
  getCategoryArticles,
  getWriterArticles,
  getArticleById,
};
