import type {
  NextPage,
  InferGetServerSidePropsType,
  GetServerSideProps,
} from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { SSRConfig } from "next-i18next";
import type { GetWriterByIdResult } from "../../../../server/headlessCMSHTTP";
import { getWriterById } from "../../../../server/headlessCMSHTTP";
import BlogHeader from "../../../blog/BlogHeader";
import WriterDetailsSection from "../../../blog/WriterDetailsSection";
import ArticleCardItem from "../../../blog/ArticleCardItem";
import Pagination from "../../../blog/Pagination";
import { useRouter } from "next/router";
import useWriterArticles from "../../../../hooks/blog/useWriterArticles";
import ArticleCardSkeleton from "../../../blog/ArticleCardSkeleton";
import Metadata from "../../../common/Metadata";

interface WriterServerSideProps extends SSRConfig {
  locale: string;
  writer: GetWriterByIdResult;
}
const getServerSideProps: GetServerSideProps<
  WriterServerSideProps,
  { writerId: string }
> = async function ({ locale = "en", defaultLocale, params }) {
  const writer = await getWriterById(Number(params?.writerId));

  if (!writer) {
    return {
      notFound: true,
    };
  }

  if (writer.attributes.locale != locale) {
    const writerWithCorrectLocale = writer.attributes.localizations.data.find(
      (writerWithOtherLocale) =>
        writerWithOtherLocale.attributes.locale == locale
    );

    if (!writerWithCorrectLocale) {
      return {
        notFound: true,
      };
    }

    const localePrefix = locale == defaultLocale ? "" : `/${locale}`;
    return {
      redirect: {
        destination: `${localePrefix}/blog/writers/${writerWithCorrectLocale.id}`,
        permanent: true,
      },
    };
  }

  return {
    props: {
      locale,
      ...(await serverSideTranslations(locale, ["common", "blog"])),
      writer,
    },
  };
};

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;
const Writer: NextPage<Props> = ({ locale, writer }) => {
  const router = useRouter();
  const page = Number(router.query.page) || 1;
  const writerPhoto = writer.attributes.photo.data || undefined;
  const { isLoading, articles, articlesCount, pagesCount } = useWriterArticles({
    locale,
    writerId: writer.id,
    page,
  });

  return (
    <>
      <Metadata
        locale={locale}
        title={writer.attributes.full_name}
        description={writer.attributes.bio}
        ogType="profile"
        ogImage={
          writerPhoto && {
            src: `${process.env.NEXT_PUBLIC_CMS_BASE_URL!}${
              writerPhoto.attributes.url
            }`,
            width: writerPhoto.attributes.width,
            height: writerPhoto.attributes.height,
          }
        }
        twitterCardType="summary"
      />
      <BlogHeader />
      <WriterDetailsSection writer={writer} articlesCount={articlesCount} />
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
export default Writer;
