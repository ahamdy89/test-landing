import type {
  NextPage,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import type { StaticImageData } from "next/image";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { DirectionProvider } from "@radix-ui/react-direction";
import Metadata from "../components/common/Metadata";
import socialMediaImageEn from "../public/images/common/social-media-image-en.jpg";
import socialMediaImageAR from "../public/images/common/social-media-image-ar.jpg";
import Section1 from "../components/join-us/Section1";
import Section2 from "../components/join-us/Section2";
import Section3 from "../components/join-us/Section3";
import Section4 from "../components/join-us/Section4";
import Section5 from "../components/join-us/Section5";
import Section6 from "../components/join-us/Section6";

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
      ...(await serverSideTranslations(locale, ["common", "join-us"])),
    },
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;
const JoinUs: NextPage<Props> = ({ locale }) => {
  const { t } = useTranslation("join-us");

  return (
    // This page will be in english, regardless of the selected language
    // That's why we'll hardcode the dir attribute
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
      <DirectionProvider dir="ltr">
        <div
          className="flex flex-col items-center font-ESRebondGrotesque"
          lang="en"
          dir="ltr"
        >
          <Section1 />
          <Section2 />
          <Section3 />
          <Section4 />
          <Section5 />
          <Section6 />
        </div>
      </DirectionProvider>
    </>
  );
};

export { getStaticProps };
export default JoinUs;
