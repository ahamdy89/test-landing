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
      ...(await serverSideTranslations(locale, [
        "common",
        "terms-and-conditions",
      ])),
    },
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;
const TermsAndConditions: NextPage<Props> = ({ locale }) => {
  const { t } = useTranslation("terms-and-conditions");

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
        <ol className="flex list-decimal flex-col gap-2 pe-0 ps-[2ch]">
          <li>
            <h2 className="text-lg">{t("SECTION_1_HEADING")}</h2>
            <p>{t("SECTION_1_PARAGRAPH")}</p>
          </li>
          <li>
            <h2 className="text-lg">{t("SECTION_2_HEADER")}</h2>
            <dl>
              <dt className="inline font-semibold after:me-1 after:ms-0 after:content-[':_']">
                {t("SECTION_2_TERM_1")}
              </dt>
              <dd className="inline">{t("SECTION_2_DESCRIPTION_1")}</dd>
              <br />
              <dt className="inline font-semibold after:me-1 after:ms-0 after:content-[':_']">
                {t("SECTION_2_TERM_2")}
              </dt>
              <dd className="inline">{t("SECTION_2_DESCRIPTION_2")}</dd>
              <br />
              <dt className="inline font-semibold after:me-1 after:ms-0 after:content-[':_']">
                {t("SECTION_2_TERM_3")}
              </dt>
              <dd className="inline">{t("SECTION_2_DESCRIPTION_3")}</dd>
              <br />
              <dt className="inline font-semibold after:me-1 after:ms-0 after:content-[':_']">
                {t("SECTION_2_TERM_4")}
              </dt>
              <dd className="inline">{t("SECTION_2_DESCRIPTION_4")}</dd>
              <br />
              <dt className="inline font-semibold after:me-1 after:ms-0 after:content-[':_']">
                {t("SECTION_2_TERM_5")}
              </dt>
              <dd className="inline">{t("SECTION_2_DESCRIPTION_5")}</dd>
              <br />
              <dt className="inline font-semibold after:me-1 after:ms-0 after:content-[':_']">
                {t("SECTION_2_TERM_6")}
              </dt>
              <dd className="inline">{t("SECTION_2_DESCRIPTION_6")}</dd>
              <br />
              <dt className="inline font-semibold after:me-1 after:ms-0 after:content-[':_']">
                {t("SECTION_2_TERM_7")}
              </dt>
              <dd className="inline">{t("SECTION_2_DESCRIPTION_7")}</dd>
              <br />
              <dt className="inline font-semibold after:me-1 after:ms-0 after:content-[':_']">
                {t("SECTION_2_TERM_8")}
              </dt>
              <dd className="inline">{t("SECTION_2_DESCRIPTION_8")}</dd>
              <br />
              <dt className="inline font-semibold after:me-1 after:ms-0 after:content-[':_']">
                {t("SECTION_2_TERM_9")}
              </dt>
              <dd className="inline">{t("SECTION_2_DESCRIPTION_9")}</dd>
              <br />
              <dt className="after:me-1inline font-semibold after:ms-0 after:content-[':_']">
                {t("SECTION_2_TERM_10")}
              </dt>
              <dd className="inline">{t("SECTION_2_DESCRIPTION_10")}</dd>
              <br />
              <dt className="after:me-1inline font-semibold after:ms-0 after:content-[':_']">
                {t("SECTION_2_TERM_11")}
              </dt>
              <dd className="inline">{t("SECTION_2_DESCRIPTION_11")}</dd>
              <br />
              <dt className="after:me-1inline font-semibold after:ms-0 after:content-[':_']">
                {t("SECTION_2_TERM_12")}
              </dt>
              <dd className="inline">{t("SECTION_2_DESCRIPTION_12")}</dd>
              <br />
              <dt className="after:me-1inline font-semibold after:ms-0 after:content-[':_']">
                {t("SECTION_2_TERM_13")}
              </dt>
              <dd className="inline">{t("SECTION_2_DESCRIPTION_13")}</dd>
            </dl>
          </li>
          <li>
            <h2 className="text-lg">{t("SECTION_3_HEADER")}</h2>
            <ul className="list-disc">
              <li>{t("SECTION_3_ITEM_1")}</li>
              <li>{t("SECTION_3_ITEM_2")}</li>
            </ul>
          </li>
          <li>
            <h2 className="text-lg">{t("SECTION_4_HEADER")}</h2>
            <ul className="list-disc">
              <li>{t("SECTION_4_ITEM_1")}</li>
              <li>{t("SECTION_4_ITEM_2")}</li>
              <li>{t("SECTION_4_ITEM_3")}</li>
              <li>{t("SECTION_4_ITEM_4")}</li>
              <li>{t("SECTION_4_ITEM_5")}</li>
              <li>{t("SECTION_4_ITEM_6")}</li>
              <li>{t("SECTION_4_ITEM_7")}</li>
              <li>{t("SECTION_4_ITEM_8")}</li>
              <li>{t("SECTION_4_ITEM_9")}</li>
              <li>{t("SECTION_4_ITEM_10")}</li>
              <li>{t("SECTION_4_ITEM_11")}</li>
              <li>{t("SECTION_4_ITEM_12")}</li>
              <li>{t("SECTION_4_ITEM_13")}</li>
              <li>{t("SECTION_4_ITEM_14")}</li>
              <li>{t("SECTION_4_ITEM_15")}</li>
              <li>{t("SECTION_4_ITEM_16")}</li>
              <li>{t("SECTION_4_ITEM_17")}</li>
              <li>{t("SECTION_4_ITEM_18")}</li>
            </ul>
          </li>
          <li>
            <h2 className="text-lg">{t("SECTION_5_HEADER")}</h2>
            <ul className="list-disc">
              <li>{t("SECTION_5_ITEM_1")}</li>
              <li>{t("SECTION_5_ITEM_2")}</li>
              <li>{t("SECTION_5_ITEM_3")}</li>
            </ul>
          </li>
          <li>
            <h2 className="text-lg">{t("SECTION_6_HEADER")}</h2>
            <ul className="list-disc">
              <li>{t("SECTION_6_ITEM_1")}</li>
              <li>{t("SECTION_6_ITEM_2")}</li>
            </ul>
          </li>
          <li>
            <h2 className="text-lg">{t("SECTION_7_HEADER")}</h2>
            <ul className="list-disc">
              <li>{t("SECTION_7_ITEM_1")}</li>
              <li>{t("SECTION_7_ITEM_2")}</li>
              <li>{t("SECTION_7_ITEM_3")}</li>
              <li>{t("SECTION_7_ITEM_4")}</li>
              <li>{t("SECTION_7_ITEM_5")}</li>
              <li>{t("SECTION_7_ITEM_6")}</li>
              <li>{t("SECTION_7_ITEM_7")}</li>
              <li>{t("SECTION_7_ITEM_8")}</li>
            </ul>
          </li>
        </ol>
      </div>
    </>
  );
};

export { getStaticProps };
export default TermsAndConditions;
