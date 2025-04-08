import Image from "next/image";
import { useTranslation, Trans } from "next-i18next";
import section12PhotoURL from "../../public/images/personal/section-12-photo.png";

interface Props {
  openGetStartedModal: () => void;
}
export default function Section12({ openGetStartedModal }: Props) {
  const { t } = useTranslation(["personal", "common"]);

  return (
    <section className="max-w-screen-mobile flex w-full flex-col items-center gap-14 px-8 py-16 bg-bleed-[#FFEFE1]/50 laptop:max-w-screen-laptop laptop:flex-row-reverse">
      <div className="flex grow basis-1/2 flex-col items-start gap-3 laptop:max-w-[50%]">
        <h2>
          <Trans t={t} i18nKey="personal:SECTION_12_HEADING" />
        </h2>
        <p>
          <Trans t={t} i18nKey="personal:SECTION_12_PARAGRAPH" />
        </p>
        {/* <button
          className="rounded-full border-2 border-black bg-white px-12 py-1 text-lg font-medium solid-shadow-bronze"
          onClick={openGetStartedModal}
        >
          <Trans t={t} i18nKey="common:CTA_GET_STARTED" />
        </button> */}
      </div>
      <Image
        src={section12PhotoURL}
        className="grow basis-1/2 laptop:max-w-[50%]"
        sizes="100vw"
        placeholder="blur"
        alt=""
      />
    </section>
  );
}
