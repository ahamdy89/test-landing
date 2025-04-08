import Link from "next/link";
import Header from "../common/Header";
import { useTranslation, Trans } from "next-i18next";
import { useRouter } from "next/router";

interface Props {
  openBusinessFormModal: () => void;
}

export default function Section1({ openBusinessFormModal }: Props) {
  const { t } = useTranslation(["common", "contact-us"]);
  const router = useRouter();

  return (
    <>
      <div className="max-w-screen-mobile w-full p-8 laptop:max-w-screen-laptop">
        <Header>
          <nav className="col-start-1 col-end-4 row-start-2 row-end-3 flex justify-center laptop:col-start-2 laptop:col-end-3 laptop:row-start-1 laptop:row-end-2">
            <ul className="flex rounded-full text-base font-bold ring-2 ring-inset ring-black">
              <li className="flex items-center rounded-full border-black bg-black text-white">
                <Link
                  href="/personal"
                  className="rounded-full px-4 py-1 laptop:px-6 laptop:py-2"
                >
                  <Trans t={t} i18nKey="common:HEADER_PERSONAL" />
                </Link>
              </li>
              <li className="flex items-center">
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
      <h1 className="max-w-screen-mobile mt-6 w-full p-4 text-5xl text-[#022821] laptop:max-w-screen-laptop">
        <Trans t={t} i18nKey="contact-us:SECTION_ONE_TITLE" />
      </h1>
      <section className="max-w-screen-mobile flex w-full flex-auto flex-col gap-3 overflow-y-hidden px-4 py-8 laptop:max-w-screen-laptop laptop:flex-row laptop:justify-around">
        <div className="lg:w-1/3 flex flex-col gap-3 rounded-3xl bg-[#E3F6F2] p-5 laptop:max-w-[33.3%]">
          <div>
            <h2 className="text-[1.825rem] text-[#022821]">
              <Trans
                t={t}
                i18nKey="contact-us:SECTION_ONE_SALES_CARD_TITLE_PART_ONE"
              />
            </h2>
            <h2 className="text-[1.825rem] text-[#022821]">
              <Trans
                t={t}
                i18nKey="contact-us:SECTION_ONE_SALES_CARD_TITLE_PART_TWO"
              />
            </h2>
          </div>
          <p className="text-[1.250rem] leading-7 text-black/60">
            <Trans
              t={t}
              i18nKey="contact-us:SECTION_ONE_SALES_CARD_TITLE_DESCRIPTION"
            />
          </p>
          <div className="mobile: max-w-screen-mobile mt-auto flex w-full items-end justify-between gap-4 py-6 laptop:max-w-screen-laptop laptop:justify-between">
            <button
              className="rounded-full border-2 border-black bg-white px-8 py-1 text-center text-lg font-medium text-black solid-shadow-[#0BCCA7]"
              onClick={openBusinessFormModal}
            >
              <Trans t={t} i18nKey="common:HEADER_BUSINESS" />
            </button>
            <button
              className="rounded-full border-2 border-black bg-white px-8 py-1 text-center text-lg font-medium text-black solid-shadow-[#0BCCA7]"
              onClick={() => router.push("/personal")}
            >
              <Trans t={t} i18nKey="common:HEADER_PERSONAL" />
            </button>
          </div>
        </div>
        <div className="lg:w-1/3 flex flex-col  gap-3 rounded-3xl bg-[#E9F7FA] p-5 laptop:max-w-[33.3%]">
          <div>
            <h2 className="text-[1.825rem] text-[#022821]">
              <Trans
                t={t}
                i18nKey="contact-us:SECTION_ONE_PARTNERSHIP_CARD_TITLE_PART_ONE"
              />
            </h2>
            <h2 className="text-[1.825rem] text-[#022821]">
              {" "}
              <Trans
                t={t}
                i18nKey="contact-us:SECTION_ONE_PARTNERSHIP_CARD_TITLE_PART_TWO"
              />
            </h2>
          </div>
          <p className="text-[1.375rem] leading-7 text-black/60 ">
            <Trans
              t={t}
              i18nKey="contact-us:SECTION_ONE_PARTNERSHIP_CARD_TITLE_DESCRIPTION"
            />
          </p>
          <div className="max-w-screen-mobile mt-auto flex w-full items-end gap-4 py-6 laptop:max-w-screen-laptop">
            <Link
              href="mailto:partnerships@axisapp.com"
              className="rounded-full border-2 border-black bg-white px-8 py-1 text-lg font-medium text-black solid-shadow-blue/100"
            >
              <Trans
                t={t}
                i18nKey="contact-us:SECTION_ONE_PARTNERSHIP_CARD_BUTTON"
              />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
