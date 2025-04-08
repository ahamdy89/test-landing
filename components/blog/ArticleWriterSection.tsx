import Image from "next/image";
import Link from "next/link";
import { useTranslation, Trans } from "next-i18next";
import type {
  BlogRecord,
  WriterAttributes,
} from "../../server/headlessCMSHTTP/types";

interface Props {
  writer: BlogRecord<Pick<WriterAttributes, "full_name" | "photo">>;
}
export default function ArticleWriterSection({ writer }: Props) {
  const { t } = useTranslation("blog");
  let photo = writer?.attributes.photo.data || null;

  return (
    <div className="sticky top-4 grid grid-cols-1 grid-rows-[45px_45px_1fr] justify-items-center">
      <div className="col-start-1 col-end-2 row-start-2 row-end-4 flex w-full flex-col items-center gap-3 rounded-2xl bg-white p-4 pt-12 shadow-[0px_0px_30px] shadow-[rgba(220,220,220,0.5)]">
        <span className="text-xl font-bold">{writer.attributes.full_name}</span>
        <Link className="underline" href={`/blog/writers/${writer.id}`}>
          <Trans t={t} i18nKey="WRITER_ARTICLES_LINK_LABEL" />
        </Link>
      </div>
      {photo != null && (
        <Image
          className="col-start-1 col-end-2 row-start-1 row-end-3 h-full rounded-full object-cover"
          width={90}
          height={90}
          src={`${process.env.NEXT_PUBLIC_CMS_BASE_URL!}${
            photo.attributes.url
          }`}
          alt={photo.attributes.alternativeText || ""}
        />
      )}
    </div>
  );
}
