import Image from "next/image";
import { useTranslation, Trans } from "next-i18next";
import section5IllustrationURL from "../../public/images/business/section-5-illustration.png";

interface Props {
  openStartTodayModal: () => void;
}
export default function Section5({ openStartTodayModal }: Props) {
  const { t } = useTranslation(["business", "common"]);

  return (
    <section className="max-w-screen-mobile flex w-full flex-col items-center gap-14 px-8 pt-16 laptop:max-w-screen-laptop laptop:flex-row-reverse">
      <div className="flex grow basis-1/2 flex-col items-start gap-3 laptop:max-w-[50%]">
        <h2>
          <Trans t={t} i18nKey="business:SECTION_5_HEADING" />
        </h2>
        <p>
          <Trans t={t} i18nKey="business:SECTION_5_PARAGRAPH" />
        </p>
        <button
          onClick={openStartTodayModal}
          className="rounded-full border-2 border-black bg-white px-12 py-1 text-lg font-medium solid-shadow-brand-primary"
        >
          <Trans t={t} i18nKey="common:CTA_START_TODAY" />
        </button>
      </div>
      <Image
        src={section5IllustrationURL}
        className="grow basis-1/2 laptop:max-w-[50%]"
        sizes="100vw"
        placeholder="blur"
        alt=""
      />
    </section>
  );
}
