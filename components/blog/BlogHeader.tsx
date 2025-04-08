import Link from "next/link";
import { Trans, useTranslation } from "next-i18next";
import Header from "../common/Header";

export default function BlogHeader() {
  const { t } = useTranslation("common");

  return (
    <div className="max-w-screen-mobile flex w-full justify-center p-8 laptop:max-w-screen-laptop">
      <Header allowChangeLocale={false}>
        <nav className="col-start-1 col-end-4 row-start-2 row-end-3 flex justify-center laptop:col-start-2 laptop:col-end-3 laptop:row-start-1 laptop:row-end-2">
          <ul className="flex rounded-full text-base font-bold ring-2 ring-inset ring-black">
            <li className="flex items-center rounded-full border-black bg-black text-white">
              <Link
                href="/personal"
                className="rounded-full px-4 py-1 laptop:px-6 laptop:py-2"
              >
                <Trans t={t} i18nKey="HEADER_PERSONAL" />
              </Link>
            </li>
            <li className="flex items-center">
              <Link
                href="/"
                className="rounded-full px-4 py-1 laptop:px-6 laptop:py-2"
              >
                <Trans t={t} i18nKey="HEADER_BUSINESS" />
              </Link>
            </li>
          </ul>
        </nav>
      </Header>
    </div>
  );
}
