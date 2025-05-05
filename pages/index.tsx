import axios from "axios";
import type { InferGetServerSidePropsType, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { StaticImageData } from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import Metadata from "../components/common/Metadata";
import HowToVideoModal from "../components/how-to/HowToVideoModal";
import Section1 from "../components/personal/Section1";
import Section10 from "../components/personal/Section10";
import Section2 from "../components/personal/Section2";
import Section3 from "../components/personal/Section3";
import Section4 from "../components/personal/Section4";
import Section5 from "../components/personal/Section5";
import Section6 from "../components/personal/Section6";
import Section7 from "../components/personal/Section7";
import Section8 from "../components/personal/Section8";
import Section9 from "../components/personal/Section9";
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

  const router = useRouter();
  const isGetStartedModalOpen = router.query["get-started"] != undefined;
  const openGetStartedModal = () => {
    const newQuery = { ...router.query, ["get-started"]: "" };
    router.replace({ query: newQuery }, undefined, { shallow: true });
  };
  const closeGetStartedModal = () => {
    const { ["get-started"]: _, ...newQuery } = router.query;
    router.replace({ query: newQuery }, undefined, { shallow: true });
  };

  const [videoUrl, setVideoUrl] = useState("");
  const isVideoOpen = router.query["video"] != undefined;
  const openVideoModal = () => {
    const newQuery = { ...router.query, ["video"]: "" };
    router.replace({ query: newQuery }, undefined, { shallow: true });
  };
  const closeVideoModal = () => {
    const { ["video"]: _, ...newQuery } = router.query;
    router.replace({ query: newQuery }, undefined, { shallow: true });
  };
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
      <HowToVideoModal
        isOpen={isVideoOpen}
        close={closeVideoModal}
        video={videoUrl}
      />
      <Section1 />
      <Section2 />
      <Section3
        openGetStartedModal={openGetStartedModal}
        openVideoModal={openVideoModal}
        setVideoUrl={setVideoUrl}
        locale={locale}
      />
      <Section4 />
      <Section5 />
      <Section6 openGetStartedModal={openGetStartedModal} />
      <Section7 videos={videos} />
      <Section8 />
      <Section9 />
      <Section10 />
    </>
  );
};

export { getServerSideProps };
export default Personal;
