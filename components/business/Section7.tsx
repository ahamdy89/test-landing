import type { ReactElement } from "react";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import { useTranslation, Trans } from "next-i18next";
import section7Card1IconURL from "../../public/images/business/section-7-card-1-icon.png";
import section7Card2IconURL from "../../public/images/business/section-7-card-2-icon.png";
import section7Card3IconURL from "../../public/images/business/section-7-card-3-icon.png";

const businessSupportHotline =
  process.env.NEXT_PUBLIC_BUSINESS_SUPPORT_HOTLINE!;
const businessSupportEmail = process.env.NEXT_PUBLIC_BUSINESS_SUPPORT_EMAIL!;

interface CardProps {
  imageData: StaticImageData;
  title: ReactElement;
  paragraph: ReactElement;
}
function Card({ imageData, title, paragraph }: CardProps) {
  return (
    <div className="flex basis-4/5 flex-col items-start gap-3 rounded-3xl bg-white p-8 laptop:grow laptop:basis-0">
      <Image aria-hidden src={imageData} className="mb-3 w-16" alt="" />
      <h2>{title}</h2>
      <p className="text-black/60">{paragraph}</p>
    </div>
  );
}

export default function Section7() {
  const { t } = useTranslation("business");

  return (
    <section className="max-w-screen-mobile flex w-full flex-col  flex-wrap items-center gap-3 px-8 py-16 bg-bleed-off-white laptop:max-w-screen-laptop laptop:flex-row laptop:items-stretch laptop:justify-between">
      {/* Card 1 */}
      <Card
        imageData={section7Card1IconURL}
        title={<Trans t={t} i18nKey="SECTION_7_CARD_1_HEADING" />}
        paragraph={<Trans t={t} i18nKey="SECTION_7_CARD_1_PARAGRAPH" />}
      />
      {/* Card 2 */}
      <Card
        imageData={section7Card2IconURL}
        title={<Trans t={t} i18nKey="SECTION_7_CARD_2_HEADING" />}
        paragraph={<Trans t={t} i18nKey="SECTION_7_CARD_2_PARAGRAPH" />}
      />
      {/* Card 3 */}
      <Card
        imageData={section7Card3IconURL}
        title={<Trans t={t} i18nKey="SECTION_7_CARD_3_HEADING" />}
        paragraph={
          <Trans
            t={t}
            i18nKey="SECTION_7_CARD_3_PARAGRAPH"
            values={{ businessSupportHotline, businessSupportEmail }}
            components={[
              <a key="hotline" href={`tel:${businessSupportHotline}`} />,
              <a key="email" href={`mailto:${businessSupportEmail}`} />,
            ]}
          />
        }
      />
    </section>
  );
}
