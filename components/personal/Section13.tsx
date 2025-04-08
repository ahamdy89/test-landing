import Link from "next/link";
import { useTranslation, Trans } from "next-i18next";
import Image from "next/image";
import section13PhotoURL from "../../public/images/personal/section-13-photo.png";

export default function Section13() {
  const { t } = useTranslation(["personal", "common"]);

  return (
    <section className="max-w-screen-mobile relative w-full justify-center gap-14 py-16 bg-bleed-[#D7FFF7] laptop:max-w-screen-laptop">
      <div className=" flex w-full flex-col items-center justify-center  bg-contain bg-no-repeat">
        <div className="bottom-[50%] isolate flex grow basis-1/2 flex-col items-center gap-3 laptop:absolute laptop:z-10 laptop:max-w-[50%] ">
          <h2>
            <Trans t={t} i18nKey="personal:SECTION_13_HEADING" />
          </h2>
          <p className="text-center">
            <Trans t={t} i18nKey="personal:SECTION_13_PARAGRAPH" />
          </p>
          <Link
            href="/join-us"
            className="rounded-full border-2 border-black bg-white px-12 py-1 text-lg font-medium solid-shadow-brand-primary"
          >
            <Trans t={t} i18nKey="common:CTA_JOIN_US" />
          </Link>
        </div>
      </div>
      <div className="flex w-full justify-center laptop:h-[50%]">
        <div className="laptop:w-[90%]">
          <Image
            className="hidden laptop:block"
            src={section13PhotoURL}
            alt=""
            quality={100}
          />
        </div>
      </div>
    </section>
  );
}
