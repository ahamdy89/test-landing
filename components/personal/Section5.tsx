import Image from "next/image";
import { useTranslation, Trans } from "next-i18next";
import section5URL from "../../public/images/personal/picSection5.png";

export default function Section5() {
  const { t } = useTranslation(["personal", "common"]);

  return (
    <section className="flex w-full max-w-screen-mobile flex-col-reverse items-center gap-14 px-8 pt-16 tablet:flex tablet:max-w-screen-laptop tablet:flex-row tablet:justify-center laptop:flex laptop:max-w-screen-laptop laptop:flex-row laptop:justify-center laptop:p-0">
      <div className="flex grow basis-1/2 flex-col items-start gap-3 text-center tablet:flex tablet:max-w-[50%] tablet:text-start laptop:flex laptop:max-w-[50%] laptop:text-start">
        <h2 className="text-[40px] font-semibold leading-[44px] tablet:font-medium">
          <Trans t={t} i18nKey="personal:SECTION_5_HEADING" />
        </h2>
        <p className="text-xl text-[#6D6C6C]">
          <Trans t={t} i18nKey="personal:SECTION_5_PARAGRAPH" />
        </p>
      </div>
      <div className="relative h-[300px] w-full tablet:h-[430px] flex items-center  tablet:basis-1/2 laptop:h-[500px] laptop:basis-1/2">
        <Image
          src={section5URL}
          alt=""
          placeholder="blur"
          className="w-full h-4/5"
        />
      </div>
    </section>
  );
}
