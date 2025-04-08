import { useTranslation, Trans } from "next-i18next";
import sectionTwoImage from "../../public/images/contact-us/contact-us.png";
import phoneImage from "../../public/images/contact-us/phone.png";
import whatsappImage from "../../public/images/contact-us/whatsapp.png";
import Image from "next/image";
import Link from "next/link";

export default function Section2() {
  const { t } = useTranslation(["common", "contact-us"]);

  return (
    <div className="max-w-screen-mobile w-full px-4 py-8 laptop:max-w-screen-laptop">
      <div className="col-span-full mb-10 flex justify-center overflow-hidden rounded-[2rem]">
        <div className="grid grow grid-cols-2 grid-rows-1 items-center">
          <svg
            viewBox="0 0 20 10"
            xmlns="http://www.w3.org/2000/svg"
            className="col-start-1 col-end-3 row-start-1 row-end-2 overflow-visible laptop:col-start-1 laptop:col-end-2"
          >
            <circle r="15" cx="49" cy="5" className="fill-[#F9F3EE]" />
          </svg>
          <div className="col-start-1 col-end-3 row-start-1">
            <div className="mb-4 flex items-center">
              <Image
                className="me-4"
                src={phoneImage}
                alt=""
                width={30}
                height={30}
              />
              <div>
                <h2 className="text-[#022821]">
                  <Trans
                    t={t}
                    i18nKey="contact-us:SECTION_TWO_DESCRIPTION_PART_ONE"
                  />
                </h2>
                <h2 className="text-[#022821]">
                  <Trans
                    t={t}
                    i18nKey="contact-us:SECTION_TWO_DESCRIPTION_PART_TWO"
                  />
                </h2>
              </div>
            </div>
            <div className="mb-4 flex items-center">
              <Image
                className="me-4"
                src={whatsappImage}
                alt=""
                width={30}
                height={30}
              />
              <h2 className="text-[#022821]">
                <Trans
                  t={t}
                  i18nKey="contact-us:SECTION_TWO_DESCRIPTION_PART_THREE_ONE"
                />
                <Link
                  href="https://wa.me/+201556003520"
                  className="text-[rgb(var(--brand-primary))]"
                  passHref
                  target="_blank"
                >
                  <Trans
                    t={t}
                    i18nKey="contact-us:SECTION_TWO_DESCRIPTION_PART_THREE_TWO"
                  />
                </Link>
                <Trans
                  t={t}
                  i18nKey="contact-us:SECTION_TWO_DESCRIPTION_PART_THREE_THREE"
                />
              </h2>
            </div>
          </div>
        </div>
        <Image
          className="col-start-1 col-end-3 row-start-1 row-end-2  h-full w-1/4 shrink-0 flex-col justify-center gap-4 object-contain laptop:block"
          src={sectionTwoImage}
          alt="get-in-touch-image"
        />
      </div>
    </div>
  );
}
