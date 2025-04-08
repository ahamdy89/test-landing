import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { SSRConfig } from "next-i18next";
import { Trans, useTranslation } from "next-i18next";
import type {
  GetAllCategoriesResult,
  GetCategoryArticlesResult,
  GetFeaturedArticleResult,
} from "../../../server/headlessCMSHTTP";
import {
  getAllCategories,
  getCategoryArticles,
  getFeaturedArticle,
} from "../../../server/headlessCMSHTTP";
import Metadata from "../../common/Metadata";
import BlogHeader from "../../blog/BlogHeader";
import FeaturedArticle from "../../blog/FeaturedArticle";
import CategoryArticles from "../../blog/CategoryArticles";

interface BlogServerSideProps extends SSRConfig {
  locale: string;
  featuredArticle: GetFeaturedArticleResult | null;
  categories: GetAllCategoriesResult["data"];
  categoriesArticles: Record<string, GetCategoryArticlesResult["data"]>;
}
const getServerSideProps: GetServerSideProps<BlogServerSideProps> =
  async function ({ locale = "en" }) {
    const [featuredArticle, { data: categories }] = await Promise.all([
      getFeaturedArticle(locale),
      getAllCategories(locale),
    ]);

    const categoriesArticles: Record<
      string,
      GetCategoryArticlesResult["data"]
    > = {};
    await Promise.all(
      categories.map(
        async ({ id }) =>
          (categoriesArticles[id] = (
            await getCategoryArticles({
              locale,
              categoryId: id,
              limit: 3,
            })
          ).data)
      )
    );

    return {
      props: {
        locale,
        ...(await serverSideTranslations(locale, ["common", "blog"])),
        featuredArticle,
        categories,
        categoriesArticles,
      },
    };
  };

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;
const Blog: NextPage<Props> = ({
  locale,
  featuredArticle,
  categories,
  categoriesArticles,
}) => {
  const { t } = useTranslation("blog");
  const featuredArticleCoverPhoto =
    featuredArticle?.attributes?.cover_photo.data || undefined;

  return (
    <>
      <Metadata
        locale={locale}
        title={t("PAGE_TITLE")}
        description={t("PAGE_DESCRIPTION")}
        ogImage={
          featuredArticleCoverPhoto && {
            src: `${process.env.NEXT_PUBLIC_CMS_BASE_URL!}${
              featuredArticleCoverPhoto.attributes.url
            }`,
            width: featuredArticleCoverPhoto.attributes.width,
            height: featuredArticleCoverPhoto.attributes.height,
          }
        }
        twitterCardType="summary"
      />
      <BlogHeader />
      <h1 className="max-w-screen-mobile mt-8 w-full px-8 text-6xl font-semibold laptop:max-w-screen-laptop">
        <Trans t={t} i18nKey="PAGE_TITLE" />
      </h1>
      <FeaturedArticle article={featuredArticle} />
      {categories.map((category) => {
        if (categoriesArticles[String(category.id)]?.length == 0) {
          return null;
        }

        return (
          <CategoryArticles
            key={category.id}
            category={category}
            articles={categoriesArticles[String(category.id)]}
          />
        );
      })}
    </>
  );
};

export { getServerSideProps };
export default Blog;
