import type {
  NextPage,
  InferGetStaticPropsType,
  GetStaticPropsContext,
} from "next";
import type { StaticImageData } from "next/image";
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
      ...(await serverSideTranslations(locale, ["common", "privacy-policy"])),
    },
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;
const PrivacyPolicy: NextPage<Props> = ({ locale }) => {
  const { t } = useTranslation("privacy-policy");

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
        <h1 className="mt-4 text-xl">{t("HEADING")}</h1>
        <section>
          <h2 className="text-lg">{t("PREAMBLE_HEADING")}</h2>
          <p>{t("PREAMBLE_PARAGRAPH_1")}</p>
          <p>{t("PREAMBLE_PARAGRAPH_2")}</p>
          <p>{t("PREAMBLE_PARAGRAPH_3")}</p>
          <p>{t("PREAMBLE_PARAGRAPH_4")}</p>
          <h3 className="text-lg font-semibold">
            {t("PREAMBLE_CLAUSE_HEADING")}
          </h3>
          <p>{t("PREAMBLE_CLAUSE_PARAGRAPH")}</p>
          <ol className="list-decimal pe-0 ps-[2ch]">
            <li>
              <h2 className="text-lg">{t("SECTION_1_HEADING")}</h2>
              <p>{t("SECTION_1_PARAGRAPH")}</p>
              <dl>
                <dt className="inline font-semibold after:me-1 after:ms-0 after:content-[':_']">
                  {t("SECTION_1_TERM_1")}
                </dt>
                <dd className="inline">{t("SECTION_1_DESCRIPTION_1")}</dd>
                <br />
                <dt className="inline font-semibold after:me-1 after:ms-0 after:content-[':_']">
                  {t("SECTION_1_TERM_2")}
                </dt>
                <dd className="inline">{t("SECTION_1_DESCRIPTION_2")}</dd>
                <br />
                <dt className="inline font-semibold after:me-1 after:ms-0 after:content-[':_']">
                  {t("SECTION_1_TERM_3")}
                </dt>
                <dd className="inline">{t("SECTION_1_DESCRIPTION_3")}</dd>
                <br />
                <dt className="inline font-semibold after:me-1 after:ms-0 after:content-[':_']">
                  {t("SECTION_1_TERM_4")}
                </dt>
                <dd className="inline">{t("SECTION_1_DESCRIPTION_4")}</dd>
              </dl>
            </li>
            <li>
              <h2 className="text-lg">{t("SECTION_2_HEADING")}</h2>
              <ol className="list-decimal pe-0 ps-[2ch]">
                <li>{t("SECTION_2_ITEM_1")}</li>
                <li>{t("SECTION_2_ITEM_2")}</li>
                <li>{t("SECTION_2_ITEM_3")}</li>
                <li>{t("SECTION_2_ITEM_4")}</li>
                <li>{t("SECTION_2_ITEM_5")}</li>
                <li>{t("SECTION_2_ITEM_6")}</li>
                <li>{t("SECTION_2_ITEM_7")}</li>
                <li>{t("SECTION_2_ITEM_8")}</li>
                <li>{t("SECTION_2_ITEM_9")}</li>
                <li>{t("SECTION_2_ITEM_10")}</li>
                <li>{t("SECTION_2_ITEM_11")}</li>
                <li>{t("SECTION_2_ITEM_12")}</li>
              </ol>
            </li>
            <li>
              <h2 className="text-lg">{t("SECTION_3_HEADING")}</h2>
              <ol className="list-decimal pe-0 ps-[2ch]">
                <li>{t("SECTION_3_ITEM_1")}</li>
                <li>{t("SECTION_3_ITEM_2")}</li>
                <li>{t("SECTION_3_ITEM_3")}</li>
                <li>{t("SECTION_3_ITEM_4")}</li>
              </ol>
            </li>
            <li>
              <h2 className="text-lg">{t("SECTION_4_HEADING")}</h2>
              <ol className="list-decimal pe-0 ps-[2ch]">
                <li>{t("SECTION_4_ITEM_1")}</li>
              </ol>
            </li>
            <li>
              <h2 className="text-lg">{t("SECTION_5_HEADING")}</h2>
              <ol className="list-decimal pe-0 ps-[2ch]">
                <li>{t("SECTION_5_ITEM_1")}</li>
                <li>{t("SECTION_5_ITEM_2")}</li>
              </ol>
            </li>
            <li>
              <h2 className="text-lg">{t("SECTION_6_HEADING")}</h2>
              <p>{t("SECTION_6_PARAGRAPH")}</p>
              <ol className="list-decimal pe-0 ps-[2ch]">
                <li>{t("SECTION_6_ITEM_1")}</li>
                <li>{t("SECTION_6_ITEM_2")}</li>
                <li>{t("SECTION_6_ITEM_3")}</li>
              </ol>
            </li>
            <li>
              <h2 className="text-lg">{t("SECTION_7_HEADING")}</h2>
              <ol className="list-decimal pe-0 ps-[2ch]">
                <li>{t("SECTION_7_ITEM_1")}</li>
                <li>{t("SECTION_7_ITEM_2")}</li>
                <li>{t("SECTION_7_ITEM_3")}</li>
                <li>{t("SECTION_7_ITEM_4")}</li>
                <li>{t("SECTION_7_ITEM_5")}</li>
              </ol>
            </li>
            <li>
              <h2 className="text-lg">{t("SECTION_8_HEADING")}</h2>
              <ol className="list-decimal pe-0 ps-[2ch]">
                <li>{t("SECTION_8_ITEM_1")}</li>
                <li>{t("SECTION_8_ITEM_2")}</li>
              </ol>
            </li>
          </ol>
        </section>
      </div>
    </>
  );
};

export { getStaticProps };
export default PrivacyPolicy;
