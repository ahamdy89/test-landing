import { useTranslation, Trans } from "next-i18next";
import MashreqLogo from "../common/MashreqLogo";
import MeezaLogo from "../common/MeezaLogo";
import VisaLogo from "../common/VisaLogo";

export default function Section11() {
  const { t } = useTranslation("personal");

  return (
    <section className="max-w-screen-mobile flex w-full flex-col items-center gap-14 px-8 py-36 text-center text-brand-primary bg-bleed-black laptop:max-w-screen-laptop">
      <div className="flex max-w-2xl grow basis-1/2 flex-col items-center gap-4">
        <h2 className="w-56">
          <Trans t={t} i18nKey="SECTION_11_HEADING" />
        </h2>
        <p className="w-80 laptop:w-96">
          <Trans t={t} i18nKey="SECTION_11_PARAGRAPH_1" />
        </p>
        <p className="w-80 laptop:w-96">
          <Trans t={t} i18nKey="SECTION_11_PARAGRAPH_2" />
        </p>
        <div
          className="flex w-80 items-center justify-center gap-6 laptop:w-96"
          aria-hidden
        >
          <div className="basis-1/5 laptop:basis-20">
            <VisaLogo />
          </div>
          {/* <div className="basis-1/5 laptop:basis-20">
            <MashreqLogo />
          </div> */}
          <div className="basis-1/5 laptop:basis-20">
            <MeezaLogo />
          </div>
        </div>
      </div>
    </section>
  );
}
