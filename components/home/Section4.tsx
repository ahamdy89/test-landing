import Image from "next/image";
import { useTranslation, Trans } from "next-i18next";
import picSection4URL from "../../public/images/personal/picsec4.webp";

export default function Section4() {
  const { t } = useTranslation(["personal", "common"]);

  return (
    <section className="flex w-full max-w-screen-mobile flex-col-reverse items-center gap-14 px-8 pt-16 tablet:flex tablet:flex-row-reverse laptop:max-w-screen-laptop laptop:flex-row-reverse laptop:justify-center laptop:px-0 laptop:pt-12">
      <div className="flex basis-1/2 flex-col gap-3 text-center align-middle tablet:text-start">
        <h2 className="text-[40px] font-semibold leading-[44px] tablet:font-medium">
          <Trans t={t} i18nKey="personal:SECTION_4_HEADING" />
        </h2>
        <p className="text-xl text-[#6D6C6C]">
          <Trans t={t} i18nKey="personal:SECTION_4_PARAGRAPH" />
        </p>
      </div>
      <div aria-hidden className="flex basis-1/2">
        <Image
          aria-hidden
          src={picSection4URL}
          placeholder="blur"
          blurDataURL="/images/placeholder.png"
          alt="axis-img-section-four"
          className="h-full w-full"
        />
      </div>
    </section>
  );
}
