import type {
  NextPage,
  InferGetServerSidePropsType,
  GetServerSideProps,
} from "next";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { SSRConfig } from "next-i18next";
import type { GetCategoryByIdResult } from "../../../../server/headlessCMSHTTP";
import { getCategoryById } from "../../../../server/headlessCMSHTTP";
import BlogHeader from "../../../blog/BlogHeader";
import CategoryDetailsSection from "../../../blog/CategoryDetailsSection";
import ArticleCardItem from "../../../blog/ArticleCardItem";
import useCategoryArticles from "../../../../hooks/blog/useCategoryArticles";
import ArticleCardSkeleton from "../../../blog/ArticleCardSkeleton";
import Pagination from "../../../blog/Pagination";
import Metadata from "../../../common/Metadata";

interface CategoryServerSideProps extends SSRConfig {
  locale: string;
  category: GetCategoryByIdResult;
}
const getServerSideProps: GetServerSideProps<
  CategoryServerSideProps,
  { categoryId: string }
> = async function ({ locale = "en", defaultLocale, params }) {
  const category = await getCategoryById(Number(params?.categoryId));

  if (!category) {
    return {
      notFound: true,
    };
  }

  if (category.attributes.locale != locale) {
    const categoryWithCorrectLocale =
      category.attributes.localizations.data.find(
        (categoryWithOtherLocale) =>
          categoryWithOtherLocale.attributes.locale == locale
      );

    if (!categoryWithCorrectLocale) {
      return {
        notFound: true,
      };
    }

    const localePrefix = locale == defaultLocale ? "" : `/${locale}`;
    return {
      redirect: {
        destination: `${localePrefix}/blog/categories/${categoryWithCorrectLocale.id}`,
        permanent: true,
      },
    };
  }

  return {
    props: {
      locale,
      ...(await serverSideTranslations(locale, ["common", "blog"])),
      category,
    },
  };
};

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;
const Category: NextPage<Props> = ({ locale, category }) => {
  const router = useRouter();
  const page = Number(router.query.page) || 1;
  const categoryPhoto = category.attributes.illustration.data || undefined;
  const { isLoading, articles, pagesCount } = useCategoryArticles({
    locale,
    categoryId: category.id,
    page,
  });

  return (
    <>
      <Metadata
        locale={locale}
        title={category.attributes.title}
        description={category.attributes.description}
        ogImage={
          categoryPhoto && {
            src: `${process.env.NEXT_PUBLIC_CMS_BASE_URL!}${
              categoryPhoto.attributes.url
            }`,
            width: categoryPhoto.attributes.width,
            height: categoryPhoto.attributes.height,
          }
        }
        twitterCardType="summary"
      />
      <BlogHeader />
      <CategoryDetailsSection category={category} />
      <div className="max-w-screen-mobile w-full p-8 laptop:max-w-screen-laptop">
        <div className="flex flex-wrap items-stretch gap-6 ">
          {isLoading
            ? Array.from({ length: 12 }).map((_, index) => (
                <div
                  key={index}
                  className="shrink-0 grow-0 basis-full laptop:basis-[calc((100%/3)-0.5rem)]"
                >
                  <ArticleCardSkeleton />
                </div>
              ))
            : articles.map((article) => (
                <div
                  key={article.id}
                  className="shrink-0 grow-0 basis-full laptop:basis-[calc((100%/3)-0.5rem)]"
                >
                  <ArticleCardItem locale={locale} article={article} />
                </div>
              ))}

          <div className="flex w-full justify-center">
            <Pagination pagesCount={pagesCount} />
          </div>
        </div>
      </div>
    </>
  );
};

export { getServerSideProps };
export default Category;
