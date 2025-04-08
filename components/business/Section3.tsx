import Image from "next/image";
import { useTranslation, Trans } from "next-i18next";
import section3IconURL from "../../public/images/business/section-3-icon.png";
import section3PhotoURL from "../../public/images/business/section-3-photo.png";

interface Props {
  openStartTodayModal: () => void;
}
export default function Section3({ openStartTodayModal }: Props) {
  const { t } = useTranslation(["business", "common"]);

  return (
    <section className="max-w-screen-mobile flex w-full flex-col items-center gap-14 px-8 py-16 bg-bleed-bronze-light laptop:max-w-screen-laptop laptop:flex-row-reverse">
      <div className="flex grow basis-1/2 flex-col items-start gap-3 laptop:max-w-[50%]">
        <Image aria-hidden src={section3IconURL} className="w-10" alt="" />
        <h2>
          <Trans
            t={t}
            i18nKey="business:SECTION_3_HEADING"
            components={[<span key="0" className="italic" />]}
          />
        </h2>
        <p>
          <Trans t={t} i18nKey="business:SECTION_3_PARAGRAPH" />
        </p>
        <button
          onClick={openStartTodayModal}
          className="rounded-full border-2 border-black bg-white px-12 py-1 text-lg font-medium solid-shadow-black"
        >
          <Trans t={t} i18nKey="common:CTA_START_TODAY" />
        </button>
      </div>
      <Image
        src={section3PhotoURL}
        className="grow basis-1/2 laptop:max-w-[50%]"
        sizes="100vw"
        placeholder="blur"
        alt=""
      />
    </section>
  );
}
