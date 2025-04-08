import type {
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Metadata from "../components/common/Metadata";
import type { StaticImageData } from "next/image";
import socialMediaImageEn from "../public/images/common/social-media-image-en.jpg";
import socialMediaImageAR from "../public/images/common/social-media-image-ar.jpg";
import { useTranslation } from "react-i18next";
import Section1 from "../components/contact-us/section1";
import Section2 from "../components/contact-us/section2";
import { useRouter } from "next/router";
import StartTodayModal from "../components/business/StartTodayModal";
import ThankYouModal from "../components/business/ThankYouModal";

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
      ...(await serverSideTranslations(locale, [
        "common",
        "contact-us",
        "contact-support",
        "personal",
        "business",
      ])),
    },
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;
const ContactUs: NextPage<Props> = ({ locale }) => {
  const { t } = useTranslation("contact-us");
  const router = useRouter();

  const isBusinessModalOpen = router.query["start-today"] != undefined;
  const isSuccessModalOpen = router.query["thank-you"] != undefined;

  const openBusinessFormModal = () => {
    const newQuery = { ...router.query, ["start-today"]: "" };
    router.replace({ query: newQuery }, undefined, { shallow: true });
  };
  const closeBusinessModal = () => {
    const { ["start-today"]: _, ...newQuery } = router.query;
    router.replace({ query: newQuery }, undefined, { shallow: true });
  };

  const openIsSuccessModal = () => {
    const { ["start-today"]: _, ...newQuery } = router.query;
    const updatedQuery = { ...newQuery, ["thank-you"]: "" };
    router.replace({ query: updatedQuery }, undefined, { shallow: true });
  };

  const closeIsSuccessModal = () => {
    const { ["thank-you"]: _, ...newQuery } = router.query;
    router.replace({ query: newQuery }, undefined, { shallow: true });
  };

  return (
    <div className="test">
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
      <StartTodayModal
        openSuccessModal={openIsSuccessModal}
        isOpen={isBusinessModalOpen}
        close={closeBusinessModal}
        locale={locale}
      />
      <ThankYouModal isOpen={isSuccessModalOpen} close={closeIsSuccessModal} />

      <Section1 openBusinessFormModal={openBusinessFormModal} />
      <Section2 />
    </div>
  );
};

export { getStaticProps };
export default ContactUs;
