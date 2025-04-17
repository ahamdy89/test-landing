import type {
  NextPage,
  InferGetStaticPropsType,
  GetStaticPropsContext,
} from "next";
import { useRouter } from "next/router";
import type { StaticImageData } from "next/image";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Metadata from "../components/common/Metadata";
import socialMediaImageEn from "../public/images/common/social-media-image-en.jpg";
import socialMediaImageAR from "../public/images/common/social-media-image-ar.jpg";
import Section1 from "../components/personal/Section1";
import Section2 from "../components/personal/Section2";
import Section3 from "../components/personal/Section3";
import Section4 from "../components/personal/Section4";
import Section5 from "../components/personal/Section5";
import Section6 from "../components/personal/Section6";
import Section7 from "../components/personal/Section7";
import Section8 from "../components/personal/Section8";
import Section9 from "../components/personal/Section9";
import Section10 from "../components/personal/Section10";
import Section11 from "../components/personal/Section11";
import Section12 from "../components/personal/Section12";
import Section13 from "../components/personal/Section13";
import GetStartedModal from "../components/personal/GetStartedModal";
import Section14 from "../components/personal/Section14";
import HowToVideoModal from "../components/how-to/HowToVideoModal";
import { useState } from "react";

const socialMediaImages: { [locale: string]: StaticImageData } = {
  en: socialMediaImageEn,
  ar: socialMediaImageAR,
};

const getStaticProps = async function ({
  locale = "en",
}: GetStaticPropsContext) {
  return {
    props: {
      locale,
      ...(await serverSideTranslations(locale, ["common", "personal"])),
    },
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;
const Personal: NextPage<Props> = ({ locale }) => {
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

      <Section7 />
      <Section8 />
      <Section9 />
      <Section10 />
    </>
  );
};

export { getStaticProps };
export default Personal;
