import type {
  NextPage,
  InferGetStaticPropsType,
  GetStaticPropsContext,
} from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import type { StaticImageData } from "next/image";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Metadata from "../components/common/Metadata";
import socialMediaImageEn from "../public/images/common/social-media-image-en.jpg";
import socialMediaImageAR from "../public/images/common/social-media-image-ar.jpg";
import Section1 from "../components/faq/section1";
import Pagination from "../components/faq/Pagination";
import useFAQs from "../hooks/FAQ/useFAQs";

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
      ...(await serverSideTranslations(locale, ["common", "faq"])),
    },
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;
const FAQ: NextPage<Props> = ({ locale }) => {
  const { t } = useTranslation("faq");
  const router = useRouter();
  const page = Number(router.query.page) || 1;
  const [faqType, setFAQType] = useState<"personal" | "business">("personal");
  const { isLoading, FAQs, pagesCount, refetch } = useFAQs(
    locale.toLowerCase(),
    faqType,
    page
  );
  useEffect(() => {
    if (router.asPath.includes("business")) {
      setFAQType("business");
    } else {
      setFAQType("personal");
    }
    refetch();
  }, [router]);
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
      <Section1 faqData={FAQs} isLoading={isLoading} />
      <div className="mb-10 flex w-full justify-center">
        <Pagination pagesCount={pagesCount} />
      </div>
    </>
  );
};

export { getStaticProps };
export default FAQ;
