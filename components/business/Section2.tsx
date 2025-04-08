import Image from "next/image";
import { useTranslation, Trans } from "next-i18next";
import section2IconURL from "../../public/images/business/section-2-icon.png";
import section2PhotoURL from "../../public/images/business/section-2-photo.png";

interface Props {
  openStartTodayModal: () => void;
}
export default function Section2({ openStartTodayModal }: Props) {
  const { t } = useTranslation(["business", "common"]);

  return (
    <section className="max-w-screen-mobile flex w-full flex-col items-center gap-14 px-8 py-16 bg-bleed-brand-primary-light laptop:max-w-screen-laptop laptop:flex-row">
      <div className="flex grow basis-1/2 flex-col items-start gap-3 laptop:max-w-[50%]">
        <Image aria-hidden src={section2IconURL} className="w-10" alt="" />
        <h2>
          <Trans t={t} i18nKey="business:SECTION_2_HEADING" />
        </h2>
        <p>
          <Trans t={t} i18nKey="business:SECTION_2_PARAGRAPH" />
        </p>
        <button
          onClick={openStartTodayModal}
          className="rounded-full border-2 border-black bg-white px-12 py-1 text-lg font-medium solid-shadow-black"
        >
          <Trans t={t} i18nKey="common:CTA_START_TODAY" />
        </button>
      </div>
      <Image
        src={section2PhotoURL}
        className="grow basis-1/2 laptop:max-w-[50%]"
        sizes="100vw"
        placeholder="blur"
        alt=""
      />
    </section>
  );
}
