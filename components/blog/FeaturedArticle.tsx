import { useRouter } from "next/router";
import Image from "next/image";
import { Trans, useTranslation } from "next-i18next";
import dayjs from "dayjs";
import type { GetFeaturedArticleResult } from "../../server/headlessCMSHTTP";
import Link from "next/link";

interface Props {
  article: GetFeaturedArticleResult | null;
}
export default function FeaturedArticle({ article }: Props) {
  const { t } = useTranslation("blog");
  const { locale } = useRouter();

  if (!article) {
    return null;
  }

  const {
    attributes: {
      cover_photo: { data: cover_photo },
      category: { data: category },
      writer: { data: writer },
    },
  } = article;

  let writer_photo = writer?.attributes.photo.data || null;

  return (
    <div className="max-w-screen-mobile w-full p-8 laptop:max-w-screen-laptop">
      <Link
        href={`/blog/${article.id}`}
        className="grid grid-cols-[5rem_2fr_1fr] grid-rows-[max-content_min-content_min-content] overflow-hidden rounded-2xl shadow-[0px_0px_30px] shadow-[rgba(220,220,220,0.5)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0px_0px_35px] hover:shadow-[rgb(150,150,150,0.8)] laptop:grid-rows-[max-content_min-content_5rem] laptop:overflow-visible laptop:rounded-none laptop:shadow-none laptop:hover:shadow-none"
      >
        <div className="col-start-1 col-end-4 row-start-1 row-end-3">
          {cover_photo != null && (
            <Image
              className="h-60 w-full object-cover laptop:h-96 laptop:rounded-3xl"
              src={`${process.env.NEXT_PUBLIC_CMS_BASE_URL!}${
                cover_photo.attributes.url
              }`}
              alt={cover_photo.attributes.alternativeText || ""}
              width={cover_photo.attributes.width}
              height={cover_photo.attributes.height}
            />
          )}
        </div>

        {/* details card */}
        <div className="col-start-1 col-end-4 row-start-3 row-end-4 flex w-full flex-col gap-4 self-end bg-white p-7 laptop:col-start-2 laptop:col-end-3 laptop:row-start-2 laptop:rounded-2xl laptop:shadow-[0px_0px_30px] laptop:shadow-[rgba(220,220,220,0.5)]">
          {category != null && (
            <div className="text-lg text-brand-primary">
              {category.attributes.title}
            </div>
          )}
          <h2 className="text-4xl">{article.attributes.title}</h2>
          <div className="flex h-5 items-center gap-2 text-sm text-gray-500">
            {writer_photo != null && (
              <Image
                src={`${process.env.NEXT_PUBLIC_CMS_BASE_URL!}${
                  writer_photo.attributes.url
                }`}
                className="h-8 w-8 shrink-0 rounded-full object-cover"
                alt={writer_photo.attributes.alternativeText || ""}
                width={writer_photo.attributes.width}
                height={writer_photo.attributes.height}
              />
            )}
            <div className="flex grow items-center gap-1">
              {writer != null && (
                <>
                  <span>{writer.attributes.full_name}</span>|
                </>
              )}
              <time dateTime={article.attributes.updatedAt}>
                {dayjs(article.attributes.updatedAt)
                  .locale(locale!)
                  ?.format?.("DD MMMM YYYY")}
              </time>
            </div>
            <div>
              <Trans
                t={t}
                i18nKey="READ_TIME"
                values={{
                  count: Math.ceil(article.attributes.read_time_json.minutes),
                }}
              />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
