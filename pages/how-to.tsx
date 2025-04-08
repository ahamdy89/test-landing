import type { InferGetServerSidePropsType, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Metadata from "../components/common/Metadata";
import type { StaticImageData } from "next/image";
import socialMediaImageEn from "../public/images/common/social-media-image-en.jpg";
import socialMediaImageAR from "../public/images/common/social-media-image-ar.jpg";
import { Trans, useTranslation } from "next-i18next";
import Section1 from "../components/how-to/Section1";
import Link from "next/link";
import Header from "../components/common/Header";
import Section2 from "../components/how-to/Section2";
import HowToVideoModal from "../components/how-to/HowToVideoModal";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";

const socialMediaImages: { [locale: string]: StaticImageData } = {
  en: socialMediaImageEn,
  ar: socialMediaImageAR,
};
async function getServerSideProps({ locale = "en" }) {
  const response = await axios.get(process.env.YOUTUBE_HOW_TO_PLAYLIST_URL!, {
    params: {
      part: "snippet",
      playlistId: "PLi_AV_60ig0Honc0H7W1zKNDa8BEBoKB2",
      key: process.env.YOUTUBE_API_KEY,
      maxResults: 50,
    },
  });
  return {
    props: {
      videos: response.data,
      ...(await serverSideTranslations(locale, [
        "common",
        "how-to",
        "personal",
      ])),
      locale,
    },
  };
}

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;
const HowToVideos: NextPage<Props> = ({ locale, videos }) => {
  const { t } = useTranslation(["how-to", "common"]);
  const router = useRouter();
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
        title={t("how-to:PAGE_TITLE")}
        description={t("how-to:PAGE_DESCRIPTION")}
        ogImage={{
          src: `${process.env.NEXT_PUBLIC_SITE_URL || ""}${
            socialMediaImages[locale].src
          }`,
          width: socialMediaImages[locale].width,
          height: socialMediaImages[locale].height,
        }}
        twitterCardType="summary"
      />
      <div className="max-w-screen-mobile w-full p-8 laptop:max-w-screen-laptop">
        <Header>
          <nav className="col-start-1 col-end-4 row-start-2 row-end-3 flex justify-center laptop:col-start-2 laptop:col-end-3 laptop:row-start-1 laptop:row-end-2">
            <ul className="flex rounded-full text-base font-bold ring-2 ring-inset ring-black">
              <li className="flex items-center rounded-full border-black bg-black text-white">
                <Link
                  href="/"
                  className="rounded-full px-4 py-1 laptop:px-6 laptop:py-2"
                >
                  <Trans t={t} i18nKey="common:HEADER_PERSONAL" />
                </Link>
              </li>
              <li className="flex items-center">
                <Link
                  href="/business"
                  className="rounded-full px-4 py-1 laptop:px-6 laptop:py-2"
                >
                  <Trans t={t} i18nKey="common:HEADER_BUSINESS" />
                </Link>
              </li>
            </ul>
          </nav>
        </Header>
      </div>
      <HowToVideoModal
        isOpen={isVideoOpen}
        close={closeVideoModal}
        video={videoUrl}
      />
      <div className="p-8">
        <Section1 />
        <Section2
          openVideoModal={openVideoModal}
          setVideoUrl={setVideoUrl}
          videos={videos}
          locale={locale}
        />
      </div>
    </>
  );
};
export { getServerSideProps };
export default HowToVideos;
