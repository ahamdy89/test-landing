import type {
  NextPage,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import type { StaticImageData } from "next/image";
import Script from "next/script";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Metadata from "../components/common/Metadata";
import socialMediaImageEn from "../public/images/common/social-media-image-en.jpg";
import socialMediaImageAR from "../public/images/common/social-media-image-ar.jpg";
import Header from "../components/common/Header";

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
      ...(await serverSideTranslations(locale, ["common", "jobs-board"])),
    },
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;
const JobsBoard: NextPage<Props> = ({ locale }) => {
  const { t } = useTranslation("jobs-board");

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
      <div className="max-w-screen-mobile w-full p-8 laptop:max-w-screen-laptop">
        <Header />
      </div>
      <div
        id="grnhse_app"
        className="max-w-screen-mobile w-full p-8 font-ESRebondGrotesque laptop:max-w-screen-laptop"
        // Our jobs board will always be in English
        lang="en"
        dir="ltr"
        // Our jobs board will always be in English
      ></div>
      <Script
        src="https://boards.eu.greenhouse.io/embed/job_board/js?for=axisapp"
        onReady={() => {
          // this will be injected by the script
          (window as any).Grnhse?.Iframe.autoLoad();
        }}
      />
    </>
  );
};

export { getStaticProps };
export default JobsBoard;
