import { Trans, useTranslation } from "next-i18next";
import Logo from "./Logo";
import linkedInIcon from "../../public/images/common/LinkedInIcon.png";
import facebookIcon from "../../public/images/common/FacebookIcon.png";
import instagramIcon from "../../public/images/common/InstagramIcon.png";
import xIcon from "../../public/images/common/XIcon.png";
import appleStoreBlack from "../../public/images/common/apple-store-black.png";
import googlePlayBlack from "../../public/images/common/google-play-black.png";
import huaweiStoreBlack from "../../public/images/common/huawei-store-black.png";
import Image from "next/image";

export default function Footer() {
  const { t } = useTranslation("common");

  return (
    <footer className="w-full bg-off-white-footer">
      <div className="max-w-screen-mobile mx-auto px-9 py-12 laptop:max-w-screen-laptop">
        {/* Footer Links Section - Grid Layout */}
        <div className="flex flex-wrap gap-20 ">
          <div>
            <p className="pb-2 text-sm font-semibold text-black">Products</p>
            <p className="text-sm font-medium text-off-white-text">
              Axis wallet
            </p>
            <p className="text-sm font-medium text-off-white-text">Payouts</p>
            <p className="text-sm font-medium text-off-white-text">
              Remittances
            </p>
          </div>
          <div>
            <p className="pb-2 text-sm font-semibold text-black">Solutions</p>
            <p className="text-sm font-medium text-off-white-text">eCommerce</p>
            <p className="text-sm font-medium text-off-white-text">MFIs</p>
            <p className="text-sm font-medium text-off-white-text">F&B</p>
          </div>
          <div>
            <p className="pb-2 text-sm font-semibold text-black">Company</p>
            <p className="text-sm font-medium text-off-white-text">About</p>
            <p className="text-sm font-medium text-off-white-text">Tutorials</p>
            <p className="text-sm font-medium text-off-white-text">Support</p>
          </div>
        </div>

        {/* Bottom Section - Responsive Layout */}
        <div className="flex flex-col items-center justify-between gap-6 pt-4 tablet:flex-row tablet:pt-20">
          <Logo className="hidden w-24 fill-brand-primary tablet:block" />
          {/* Tablet & Mobile: App Store Section First */}
          <div className="order-1 flex flex-col justify-center gap-2 tablet:order-3 tablet:flex-row">
            <a
              href="https://apps.apple.com/eg/app/axis-%D8%A3%D9%83%D8%B3%D8%B3/id1597753411"
              target="_blank"
              rel="noreferrer"
            >
              <Image className="w-20" src={appleStoreBlack} alt="App Store" />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.axispay.consumer.wallet"
              target="_blank"
              rel="noreferrer"
            >
              <Image className="w-20" src={googlePlayBlack} alt="Google Play" />
            </a>
            <a
              href="https://appgallery.huawei.com/app/C109465235"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                className="w-20"
                src={huaweiStoreBlack}
                alt="Huawei Store"
              />
            </a>
          </div>

          {/* Tablet & Mobile: Follow Us Section Second */}
          <div className="order-2 flex items-center gap-4 tablet:order-2">
            <p>Follow us!</p>
            <div className="flex items-center gap-2">
              <a
                href={process.env.NEXT_PUBLIC_LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={linkedInIcon} alt="LinkedIn" />
              </a>
              <a
                href={process.env.NEXT_PUBLIC_FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={facebookIcon} alt="Facebook" />
              </a>
              <a
                href={process.env.NEXT_PUBLIC_INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={instagramIcon} alt="Instagram" />
              </a>
              <a
                href={process.env.NEXT_PUBLIC_TWITTER_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={xIcon} alt="Twitter" />
              </a>
            </div>
          </div>

          {/* Logo & Cairo, Egypt - Last Item in Tablet/Mobile */}
          <div className="order-3 flex items-center gap-4 text-center tablet:order-4">
            <Logo className="block w-24 fill-brand-primary tablet:hidden" />
            <p className="whitespace-nowrap">Cairo, Egypt </p>
            <p className="whitespace-nowrap">@2025 Axis </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
