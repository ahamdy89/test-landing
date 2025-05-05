import Image from "next/image";
import { useTranslation, Trans } from "next-i18next";
import section6IconURL from "../../public/images/personal/section-6-icon.png";
import section6URL from "../../public/images/personal/picSection6.png";

interface Props {
  openGetStartedModal: () => void;
}
export default function Section6({ openGetStartedModal }: Props) {
  const { t } = useTranslation(["personal", "common"]);

  return (
    <section className="isolate flex w-full max-w-screen-mobile flex-col items-center gap-14 overflow-y-hidden px-8 pb-16 tablet:flex-row  laptop:max-w-screen-laptop laptop:p-0">
      <div
        aria-hidden
        className="relative grid grow basis-1/2 place-items-center laptop:max-w-[50%]"
      >
        <Image
          src={section6URL}
          className="col-span-full row-span-full"
          sizes="100vw"
          placeholder="blur"
          alt=""
        />
      </div>
      <div className="flex grow basis-1/2 flex-col items-start gap-3 text-center tablet:text-start laptop:max-w-[50%] laptop:text-start">
        <h2 className="text-[40px] font-semibold leading-[44px] tablet:font-medium">
          <Trans t={t} i18nKey="personal:SECTION_6_HEADING" />
        </h2>
        <p className="text-xl text-[#6D6C6C]">
          <Trans t={t} i18nKey="personal:SECTION_6_PARAGRAPH" />
        </p>
      </div>
    </section>
  );
}
