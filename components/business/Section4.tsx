import Image from "next/image";
import { useTranslation, Trans } from "next-i18next";
import section4IconURL from "../../public/images/business/section-4-icon.png";
import section4ScreenshotURL from "../../public/images/business/section-4-screenshot.png";

interface Props {
  openStartTodayModal: () => void;
}
export default function Section4({ openStartTodayModal }: Props) {
  const { t } = useTranslation(["business", "common"]);

  return (
    <section className="max-w-screen-mobile flex w-full flex-col items-center gap-14 px-8 py-16 bg-bleed-pink-light laptop:max-w-screen-laptop laptop:flex-row">
      <div className="flex grow basis-1/2 flex-col items-start gap-3 laptop:max-w-[50%]">
        <Image
          aria-hidden
          src={section4IconURL}
          className="w-10 rounded-full bg-white"
          alt=""
        />
        <h2>
          <Trans t={t} i18nKey="business:SECTION_4_HEADING" />
        </h2>
        <p>
          <Trans t={t} i18nKey="business:SECTION_4_PARAGRAPH" />
        </p>
        <button
          onClick={openStartTodayModal}
          className="rounded-full border-2 border-black bg-white px-12 py-1 text-lg font-medium solid-shadow-black"
        >
          <Trans t={t} i18nKey="common:CTA_START_TODAY" />
        </button>
      </div>
      <Image
        src={section4ScreenshotURL}
        className="grow basis-1/2 laptop:max-w-[50%]"
        sizes="100vw"
        placeholder="blur"
        alt=""
      />
    </section>
  );
}
