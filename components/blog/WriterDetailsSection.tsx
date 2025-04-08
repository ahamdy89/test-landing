import Image from "next/image";
import type { GetWriterByIdResult } from "../../server/headlessCMSHTTP";
import FilledTwitterIcon from "../common/FilledTwitter";
import FilledFacebookIcon from "../common/FilledFacebook";
import FilledLinkedinIcon from "../common/FilledLinkedin";
import FilledTiktokIcon from "../common/FilledTiktok";
import FilledInstagramIcon from "../common/FilledInstagram";
import { useTranslation, Trans } from "next-i18next";

interface Props {
  writer: GetWriterByIdResult;
  articlesCount: number;
}

export default function WriterDetailsSection({ writer, articlesCount }: Props) {
  const { t } = useTranslation("blog");
  let photo = writer?.attributes.photo.data || null;

  return (
    <div className="max-w-screen-mobile w-full p-8 laptop:max-w-screen-laptop">
      <div className="flex w-full flex-col justify-center gap-10 laptop:flex-row">
        {photo && (
          <Image
            className="w-full rounded-3xl laptop:w-2/5"
            width={photo?.attributes.width}
            height={photo?.attributes.height}
            src={`${process.env.NEXT_PUBLIC_CMS_BASE_URL!}${
              photo.attributes.url
            }`}
            alt={photo?.attributes.alternativeText || ""}
          />
        )}
        <div className="flex grow flex-col justify-center gap-3">
          <div className="text-4xl font-semibold text-[#022821]">
            {writer.attributes.full_name}
          </div>
          <div className="text-xl font-medium">
            <Trans
              t={t}
              i18nKey="ARTICLES_COUNT"
              values={{
                count: articlesCount,
              }}
            />
          </div>
          <p className="text-gray-500">{writer.attributes.bio}</p>
          <div className="flex gap-6">
            {writer.attributes.facebook_url && (
              <a
                href={writer.attributes.facebook_url}
                aria-label="facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FilledFacebookIcon />
              </a>
            )}
            {writer.attributes.linkedin_url && (
              <a
                href={writer.attributes.linkedin_url}
                aria-label="linkedin"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FilledLinkedinIcon />
              </a>
            )}
            {writer.attributes.twitter_url && (
              <a
                href={writer.attributes.twitter_url}
                aria-label="twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FilledTwitterIcon />
              </a>
            )}
            {writer.attributes.tiktok_url && (
              <a
                href={writer.attributes.tiktok_url}
                aria-label="tiktok"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FilledTiktokIcon />
              </a>
            )}
            {writer.attributes.instagram_url && (
              <a
                href={writer.attributes.instagram_url}
                aria-label="instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FilledInstagramIcon />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
