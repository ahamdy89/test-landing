import Image from "next/image";
// import section1Image from "../../public/images/how-to/images/section1Image.png";
import { Trans, useTranslation } from "next-i18next";

const Section1 = () => {
  const { t } = useTranslation("how-to");

  return (
    <div className="max-w-screen-mobile w-full laptop:max-w-screen-laptop">
      <div className="col-span-full mb-10 flex justify-center overflow-hidden rounded-[2rem] bg-[#E3F6F2] px-12 py-4">
        <div className="grid grow grid-cols-2 grid-rows-1 items-center">
          <svg
            viewBox="0 0 20 10"
            xmlns="http://www.w3.org/2000/svg"
            className="col-start-1 col-end-3 row-start-1 row-end-2 overflow-visible laptop:col-start-1 laptop:col-end-2"
          >
            <circle r="15" cx="10" cy="5" className="fill-[#CEF4ED]" />
          </svg>
          <div className="col-start-1 col-end-3 row-start-1 row-end-2 flex h-full flex-col justify-center gap-4">
            <h1 className="mb-5 text-5xl text-[#022821] laptop:text-[60px]">
              <Trans t={t} i18nKey="SECTION_1_HEADING" />
            </h1>
            <p className="text-xl font-normal laptop:text-[32px]">
              <Trans t={t} i18nKey="SECTION_1_description" />
            </p>
          </div>
        </div>
        {/* <Image
          className="hidden w-1/4 shrink-0  rtl:scale-x-[-1] laptop:block"
          src={section1Image}
          sizes="100vw"
          alt="how-to-header-image"
        /> */}
      </div>
    </div>
  );
};

export default Section1;
