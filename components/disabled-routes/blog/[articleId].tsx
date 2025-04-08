import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
import Link from "next/link";
import Image from "next/image";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { SSRConfig } from "next-i18next";
import { Trans, useTranslation } from "next-i18next";
import dayjs from "dayjs";
import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import type { GetArticleByIdResult } from "../../../server/headlessCMSHTTP";
import { getArticleById } from "../../../server/headlessCMSHTTP";
import BlogHeader from "../../blog/BlogHeader";
import BookIcon from "../../common/BookIcon";
import ArticleWriterSection from "../../blog/ArticleWriterSection";
import ContentA from "../../blog/ContentA";
import ContentImg from "../../blog/ContentImg";
import ContentIFrame from "../../blog/ContentIFrame";
import Metadata from "../../common/Metadata";

const markdownComponents: Components = {
  a: ContentA,
  img: ContentImg,
  iframe: ContentIFrame,
};

interface ArticleServerSideProps extends SSRConfig {
  locale: string;
  article: GetArticleByIdResult;
}
const getServerSideProps: GetServerSideProps<
  ArticleServerSideProps,
  { articleId: string }
> = async function ({ locale = "en", defaultLocale, params }) {
  const article = await getArticleById(Number(params?.articleId));

  if (!article) {
    return {
      notFound: true,
    };
  }

  if (article.attributes.locale != locale) {
    const articleWithCorrectLocale = article.attributes.localizations.data.find(
      (articleWithOtherLocale) =>
        articleWithOtherLocale.attributes.locale == locale
    );

    if (!articleWithCorrectLocale) {
      return {
        notFound: true,
      };
    }

    const localePrefix = locale == defaultLocale ? "" : `/${locale}`;
    return {
      redirect: {
        destination: `${localePrefix}/blog/${articleWithCorrectLocale.id}`,
        permanent: true,
      },
    };
  }

  return {
    props: {
      locale,
      ...(await serverSideTranslations(locale, ["common", "blog"])),
      article,
    },
  };
};

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;
const Article: NextPage<Props> = ({ locale, article }) => {
  const { t } = useTranslation("blog");
  const articlePhoto = article.attributes.cover_photo.data || undefined;
  const {
    attributes: {
      cover_photo: { data: cover_photo },
      writer: { data: writer },
    },
  } = article;

  return (
    <>
      <Metadata
        locale={locale}
        title={article.attributes.title}
        description={article.attributes.content.slice(0, 50) + "..."}
        ogType="article"
        ogImage={
          articlePhoto && {
            src: `${process.env.NEXT_PUBLIC_CMS_BASE_URL!}${
              articlePhoto.attributes.url
            }`,
            width: articlePhoto.attributes.width,
            height: articlePhoto.attributes.height,
          }
        }
        twitterCardType="summary"
      />
      <BlogHeader />
      <div className="max-w-screen-mobile w-full justify-center p-8 laptop:max-w-screen-laptop">
        <div className="grid grid-cols-[15rem_1fr] grid-rows-2 gap-8">
          <div className="col-start-1 col-end-3 row-start-1 row-end-2 laptop:col-start-2 laptop:col-end-3 laptop:row-start-1 laptop:row-end-3">
            <h1 className="mb-4 text-4xl font-bold">
              {article.attributes.title}
            </h1>
            <div className="flex items-center gap-1 text-gray-500">
              <time dateTime={article.attributes.updatedAt}>
                {dayjs(article.attributes.updatedAt)
                  .locale(locale)
                  ?.format?.("DD MMMM YYYY")}
              </time>
              |
              <BookIcon />
              <Trans
                t={t}
                i18nKey="READ_TIME"
                values={{
                  count: Math.ceil(article.attributes.read_time_json.minutes),
                }}
              />
            </div>
            {cover_photo != null && (
              <Image
                className="my-10 w-full rounded-3xl"
                width={cover_photo.attributes.width}
                height={cover_photo.attributes.height}
                src={`${process.env.NEXT_PUBLIC_CMS_BASE_URL!}${
                  cover_photo.attributes.url
                }`}
                alt={cover_photo.attributes.alternativeText || ""}
              />
            )}
            <article className="prose my-8 prose-li:marker:text-black">
              <ReactMarkdown
                rehypePlugins={[rehypeRaw]}
                components={markdownComponents}
              >
                {article.attributes.content}
              </ReactMarkdown>
            </article>
            {article.attributes.call_to_action_text &&
              article.attributes.call_to_action_url && (
                <Link
                  href={article.attributes.call_to_action_url}
                  className="inline-block rounded-full border-2 border-black bg-white px-12 py-1 text-center text-lg font-medium solid-shadow-brand-primary"
                >
                  {article.attributes.call_to_action_text}
                </Link>
              )}
          </div>
          <div className="relative col-start-1 col-end-3 row-start-2 row-end-3 shrink-0 grow-0 laptop:col-start-1 laptop:col-end-2 laptop:row-start-1 laptop:row-end-3">
            {writer != null && <ArticleWriterSection writer={writer} />}
          </div>
        </div>
      </div>
    </>
  );
};

export { getServerSideProps };
export default Article;
