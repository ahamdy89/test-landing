import axios from "axios";
import type { InferGetServerSidePropsType, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { StaticImageData } from "next/image";
import Metadata from "../components/common/Metadata";
import Section1 from "../components/home/Section1";
import Section10 from "../components/home/Section10";
import Section2 from "../components/home/Section2";
import Section3 from "../components/home/Section3";
import Section4 from "../components/home/Section4";
import Section5 from "../components/home/Section5";
import Section6 from "../components/home/Section6";
import Section7 from "../components/home/Section7";
import Section8 from "../components/home/Section8";
import Section9 from "../components/home/Section9";
import socialMediaImageAR from "../public/images/common/social-media-image-ar.jpg";
import socialMediaImageEn from "../public/images/common/social-media-image-en.jpg";

const socialMediaImages: { [locale: string]: StaticImageData } = {
  en: socialMediaImageEn,
  ar: socialMediaImageAR,
};

async function getServerSideProps({ locale = "en" }) {
  try {
    const response = await axios.get(process.env.YOUTUBE_HOW_TO_PLAYLIST_URL!, {
      params: {
        part: "snippet",
        playlistId: "PLi_AV_60ig0FJ7TVlo6UvgXRQg_9GQBHe",
        key: process.env.YOUTUBE_API_KEY,
        maxResults: 50,
      },
    });
    return {
      props: {
        videos: response.data,
        locale,
        ...(await serverSideTranslations(locale, ["common", "personal"])),
      },
    };
  } catch (error) {
    return {
      props: {
        videos: null,
        locale,
        ...(await serverSideTranslations(locale, ["common", "personal"])),
      },
    };
  }
}

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;
const Personal: NextPage<Props> = ({ locale, videos }) => {
  const { t } = useTranslation("personal");
  return (
    <>
      <Metadata
        locale={locale}
        title={t("PAGE_TITLE")}
        description={t("PAGE_DESCRIPTION")}
        ogImage={{
          src: `${process.env.NEXT_PUBLIC_SITE_URL || ""}${
            socialMediaImages[locale].src
          }`,
          width: socialMediaImages[locale].width,
          height: socialMediaImages[locale].height,
        }}
        twitterCardType="summary"
      />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      <Section6 />
      <Section7 videos={videos} />
      <Section8 />
      <Section9 />
      <Section10 />
    </>
  );
};

export { getServerSideProps };
export default Personal;
