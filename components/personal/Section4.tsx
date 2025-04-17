import Image from "next/image";
import { useTranslation, Trans } from "next-i18next";
import picSection4URL from "../../public/images/personal/picsec4.png";

export default function Section4() {
  const { t } = useTranslation(["personal", "common"]);

  return (
    <section className="max-w-screen-mobile isolate flex w-full flex-col-reverse items-center gap-14 overflow-y-hidden px-8 pt-4  tablet:flex-row-reverse laptop:max-w-screen-laptop laptop:flex-row-reverse laptop:px-16 ">
      <div className="flex basis-1/2 flex-col items-start gap-3 text-center tablet:text-start laptop:max-w-[50%] laptop:text-start">
        <h2 className="text-[40px] font-semibold leading-[44px] tablet:font-medium">
          <Trans t={t} i18nKey="personal:SECTION_4_HEADING" />
        </h2>
        <p className="text-xl text-[#6D6C6C]">
          <Trans t={t} i18nKey="personal:SECTION_4_PARAGRAPH" />
        </p>
      </div>

      <div aria-hidden className="h-[32rem] w-80 place-items-center  ">
        <Image aria-hidden src={picSection4URL} placeholder="blur" alt="" />
      </div>
    </section>
  );
}
