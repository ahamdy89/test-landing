import type { BlogRecord, CategoryAttributes } from "./types";
import instance from "./instance";

type GetAllCategoriesResult = {
  data: Array<BlogRecord<Pick<CategoryAttributes, "title">>>;
  count?: number;
};
async function getAllCategories(
  locale: string,
  withCount = false
): Promise<GetAllCategoriesResult> {
  const {
    data: {
      data: categories,
      meta: {
        pagination: { total },
      },
    },
  } = await instance.get<{
    data: GetAllCategoriesResult["data"];
    meta: { pagination: { total: number } };
  }>("/categories", {
    params: {
      locale,
      fields: ["title"],
      sort: "createdAt:desc",
      pagination: {
        withCount,
      },
    },
  });

  return { data: categories, count: total };
}

type GetCategoryByIdResult = BlogRecord<
  CategoryAttributes & {
    localizations: {
      data: Array<BlogRecord<Pick<CategoryAttributes, "locale">>>;
    };
  }
>;
async function getCategoryById(id: number): Promise<GetCategoryByIdResult> {
  const {
    data: { data: category },
  } = await instance.get<{ data: GetCategoryByIdResult }>(`/categories/${id}`, {
    params: {
      fields: ["*"],
      populate: {
        illustration: {
          fields: ["*"],
        },
        localizations: {
          fields: ["locale"],
        },
      },
    },
  });

  return category;
}

export type { GetAllCategoriesResult, GetCategoryByIdResult };
export { getAllCategories, getCategoryById };
