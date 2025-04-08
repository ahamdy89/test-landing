import Link from "next/link";
import Image from "next/image";
import { useTranslation, Trans } from "next-i18next";
import Header from "../common/Header";
import section1ScreenshotLaptopURL from "../../public/images/business/section-1-screenshot-laptop.png";
import section1ScreenshotMobileURL from "../../public/images/business/section-1-screenshot-mobile.png";

interface Props {
  openStartTodayModal: () => void;
}
export default function Section1({ openStartTodayModal }: Props) {
  const { t } = useTranslation(["business", "common"]);

  return (
    <div className="flex w-full flex-col items-center bg-black text-brand-primary">
      <div className="max-w-screen-mobile flex w-full justify-center p-8 laptop:max-w-screen-laptop">
        <Header>
          <nav className="col-start-1 col-end-4 row-start-2 row-end-3 flex justify-center laptop:col-start-2 laptop:col-end-3 laptop:row-start-1 laptop:row-end-2">
            <ul className="flex rounded-full text-base font-bold ring-2 ring-inset ring-brand-primary">
              <li className="flex items-center">
                <Link
                  href="/personal"
                  className="rounded-full px-4 py-1 laptop:px-6 laptop:py-2"
                >
                  <Trans t={t} i18nKey="common:HEADER_PERSONAL" />
                </Link>
              </li>
              <li className="flex items-center rounded-full border-brand-primary bg-brand-primary text-black">
                <Link
                  href="/"
                  className="rounded-full px-4 py-1 laptop:px-6 laptop:py-2"
                >
                  <Trans t={t} i18nKey="common:HEADER_BUSINESS" />
                </Link>
              </li>
            </ul>
          </nav>
        </Header>
      </div>
      <section className="flex w-full flex-col items-center">
        <div className="max-w-screen-mobile flex w-full flex-col items-center gap-5 p-8 laptop:max-w-screen-laptop">
          <h1 className="text-center">
            <Trans
              t={t}
              i18nKey="business:SECTION_1_HEADING"
              components={[
                <span key="highlighted" className="text-brand-primary" />,
              ]}
            />
          </h1>
          <p className="text-center text-lg">
            <Trans t={t} i18nKey="business:SECTION_1_PARAGRAPH" />
          </p>
          <button
            className="rounded-full border-2 border-brand-primary bg-black px-12 py-1 text-lg font-medium solid-shadow-brand-primary"
            onClick={openStartTodayModal}
          >
            <Trans t={t} i18nKey="common:CTA_START_TODAY" />
          </button>
        </div>
        <div
          className="flex w-full flex-col items-center overflow-x-hidden py-8"
          aria-hidden
        >
          <Image
            src={section1ScreenshotMobileURL}
            className="block w-full laptop:hidden"
            sizes="100vw"
            placeholder="blur"
            alt=""
          />
          <Image
            src={section1ScreenshotLaptopURL}
            className="hidden laptop:block laptop:w-full"
            sizes="100vw"
            placeholder="blur"
            alt=""
          />
        </div>
      </section>
    </div>
  );
}
