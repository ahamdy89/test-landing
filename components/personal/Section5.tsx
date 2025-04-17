import Image from "next/image";
import { useTranslation, Trans } from "next-i18next";
import section5URL from "../../public/images/personal/picSection5.png";

export default function Section5() {
  const { t } = useTranslation(["personal", "common"]);

  return (
    <section className="max-w-screen-mobile isolate flex w-full flex-col items-center gap-14 overflow-y-hidden px-8   tablet:flex-row-reverse laptop:max-w-screen-laptop laptop:flex-row-reverse">
      <div
        aria-hidden
        className="relative grid grow basis-1/2 place-items-center laptop:max-w-[50%]"
      >
        <Image
          src={section5URL}
          className="col-span-full row-span-full"
          sizes="100vw"
          placeholder="blur"
          alt=""
        />
      </div>
      <div className="gap-3laptop:max-w-[50%] flex grow basis-1/2 flex-col items-start text-center laptop:text-start">
        <h2 className="text-[40px] font-semibold leading-[44px] tablet:font-medium">
          <Trans t={t} i18nKey="personal:SECTION_5_HEADING" />
        </h2>
        <p className="text-xl text-[#6D6C6C]">
          <Trans t={t} i18nKey="personal:SECTION_5_PARAGRAPH" />
        </p>
      </div>
    </section>
  );
}
