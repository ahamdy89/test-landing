import type { PropsWithChildren } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Trans, useTranslation } from "next-i18next";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Logo from "./Logo";

interface Props {
  allowChangeLocale?: boolean;
}
export default function Header({
  allowChangeLocale = true,
  children,
}: PropsWithChildren<Props>) {
  const { t } = useTranslation();
  const { locale, asPath } = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    if (isMenuOpen) {
      window.document.body.style.overflow = "hidden";
      window.document.body.style.overscrollBehavior = "contain";
    } else {
      window.document.body.style.overflow = "unset";
      window.document.body.style.overscrollBehavior = "unset";
    }
  }, [isMenuOpen]);

  return (
    <header className="grid grow auto-cols-fr items-center ">
      <div className="col-start-1 col-end-2 row-start-1 row-end-2 flex justify-start">
        <Link href="/" aria-label="home">
          <Logo className="w-24 text-white tablet:w-36 laptop:w-36" />
        </Link>
      </div>
      {children}
      <div className="col-start-3 col-end-4 row-start-1 row-end-2 flex h-14 items-center justify-end gap-6"></div>
    </header>
  );
}
