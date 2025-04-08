import Link from "next/link";
import Image from "next/image";
import { Trans, useTranslation } from "next-i18next";
import dayjs from "dayjs";
import type { GetCategoryArticlesResult } from "../../server/headlessCMSHTTP";
import BookIcon from "../common/BookIcon";

interface Props {
  locale: string;
  article: GetCategoryArticlesResult["data"][number];
}
export default function ArticleCardItem({ locale, article }: Props) {
  const {
    attributes: {
      cover_photo: { data: cover_photo },
      writer: { data: writer },
    },
  } = article;
  let writer_photo = writer?.attributes.photo.data || null;

  const { t } = useTranslation("blog");

  return (
    <div className="isolate flex h-full w-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0px_0px_30px] shadow-[rgb(200,200,200,0.8)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0px_0px_40px] hover:shadow-[rgb(150,150,150,0.8)]">
      {cover_photo != null && (
        <Link href={`/blog/${article.id}`} className="relative">
          <Image
            src={`${process.env.NEXT_PUBLIC_CMS_BASE_URL!}${
              cover_photo.attributes.url
            }`}
            className="h-60 w-full object-cover"
            alt={cover_photo.attributes.alternativeText || ""}
            width={cover_photo.attributes.width}
            height={cover_photo.attributes.height}
          />
          <span className="absolute flex items-center gap-1 rounded-md bg-black/50 p-2 text-sm text-white [inset-block-start:1rem] [inset-inline-end:1rem]">
            <BookIcon />
            <span>
              <Trans
                t={t}
                i18nKey="READ_TIME_WITHOUT_TEXT"
                values={{
                  count: Math.ceil(article.attributes.read_time_json.minutes),
                }}
              />
            </span>
          </span>
        </Link>
      )}
      <div className="p-6">
        <time
          dateTime={article.attributes.updatedAt}
          className="text-sm text-gray-500"
        >
          {dayjs(article.attributes.updatedAt)
            .locale(locale)
            ?.format?.("DD MMMM YYYY")}
        </time>
        <h3 className="overflow-hidden text-ellipsis whitespace-nowrap text-2xl font-semibold">
          <Link href={`/blog/${article.id}`}>{article.attributes.title}</Link>
        </h3>
        <div className="flex items-center gap-2">
          {writer_photo != null && (
            <Image
              src={`${process.env.NEXT_PUBLIC_CMS_BASE_URL!}${
                writer_photo.attributes.url
              }`}
              className="h-8 w-8 rounded-full object-cover"
              alt={writer_photo.attributes.alternativeText || ""}
              width={writer_photo.attributes.width}
              height={writer_photo.attributes.height}
            />
          )}
          {writer != null && (
            <Link
              href={`/blog/writers/${writer.id}`}
              className="grow overflow-hidden text-ellipsis whitespace-nowrap text-lg font-medium underline"
            >
              {writer.attributes.full_name}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
