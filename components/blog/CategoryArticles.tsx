import Link from "next/link";
import { useRouter } from "next/router";
import { Trans, useTranslation } from "next-i18next";
import type {
  GetAllCategoriesResult,
  GetCategoryArticlesResult,
} from "../../server/headlessCMSHTTP";
import ArticleCardItem from "./ArticleCardItem";

interface Props {
  category: GetAllCategoriesResult["data"][number];
  articles: GetCategoryArticlesResult["data"];
}
export default function CategoryArticles({ category, articles }: Props) {
  const { t } = useTranslation("blog");
  const { locale } = useRouter();

  return (
    <section className="max-w-screen-mobile flex w-full flex-col gap-6 p-8 laptop:max-w-screen-laptop">
      <div className="flex justify-between">
        <h2 className="">{category.attributes.title}</h2>
        <Link
          href={`/blog/categories/${category.id}`}
          className="text-lg font-medium underline"
        >
          <Trans t={t} i18nKey="VIEW_ALL" />
        </Link>
      </div>
      <div className="flex flex-wrap items-stretch gap-6 laptop:flex-nowrap">
        {articles.map((article) => (
          <div
            key={article.id}
            className="shrink-0 grow-0 basis-full laptop:basis-[calc((100%/3)-0.5rem)]"
          >
            <ArticleCardItem locale={locale!} article={article} />
          </div>
        ))}
      </div>
    </section>
  );
}
