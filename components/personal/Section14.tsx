import Image from "next/image";
import { useTranslation } from "next-i18next";
import appleStoreLogoURL from "../../public/images/common/apple-store-white.png";
import googlePlayLogoURL from "../../public/images/common/google-play-white.png";
import huaweiStoreLogoURL from "../../public/images/common/huawei-store-white.png";
export default function Section14() {
  const { t } = useTranslation(["personal", "common"]);

  return (
    <div className="max-w-screen-mobile w-full px-8 pt-12 text-white bg-bleed-brand-primary-dark laptop:max-w-screen-laptop">
      <div className="flex flex-col items-center justify-between pb-14 laptop:flex-row">
        <div className="mb-8 text-3xl font-semibold laptop:mb-0">
          {t("personal:SECTION_14_HEADING")}
        </div>
        <div className="flex w-full flex-row gap-2 laptop:w-3/6 laptop:justify-end">
          <a
            target="_blank"
            href="https://apps.apple.com/eg/app/axis-%D8%A3%D9%83%D8%B3%D8%B3/id1597753411"
            rel="noreferrer"
          >
            <Image
              className="grow basis-0 laptop:grow-0 laptop:basis-32"
              src={appleStoreLogoURL}
              alt={t("common:APP_STORE_LOGO_ALT")}
            />
          </a>
          <a
            target="_blank"
            href="https://play.google.com/store/apps/details?id=com.axispay.consumer.wallet"
            rel="noreferrer"
          >
            <Image
              className="grow basis-0 laptop:grow-0 laptop:basis-32"
              src={googlePlayLogoURL}
              alt={t("common:PLAY_STORE_LOGO_ALT")}
            />
          </a>
          <a
            target="_blank"
            href="https://appgallery.huawei.com/app/C109465235"
            rel="noreferrer"
          >
            <Image
              className="grow basis-0 laptop:grow-0 laptop:basis-32"
              src={huaweiStoreLogoURL}
              alt={t("common:PLAY_STORE_LOGO_ALT")}
            />
          </a>
        </div>
      </div>
      <hr />
    </div>
  );
}
