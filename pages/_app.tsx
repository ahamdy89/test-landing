import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import localFont from "next/font/local";
import { Router } from "next/router";
import { appWithTranslation, useTranslation } from "next-i18next";
import "dayjs/locale/en";
import "dayjs/locale/ar";
import { DirectionProvider } from "@radix-ui/react-direction";
import nextI18NextConfig from "../next-i18next.config.js";
import Footer from "../components/common/Footer";
import "../styles/globals.css";
import { GoogleTagManager } from "@next/third-parties/google";

const esRebondGrotesque = localFont({
  display: "swap",
  variable: "--font-es-rebond-grotesque",
  src: [
    {
      path: "../public/fonts/ESRebondGrotesque-Regular.woff2",
      style: "normal",
      weight: "400",
    },
    {
      path: "../public/fonts/ESRebondGrotesque-Medium.woff2",
      style: "normal",
      weight: "500",
    },
    {
      path: "../public/fonts/ESRebondGrotesque-Semibold.woff2",
      style: "normal",
      weight: "600",
    },
    {
      path: "../public/fonts/ESRebondGrotesque-Bold.woff2",
      style: "normal",
      weight: "700",
    },
  ],
});
const avenirArabic = localFont({
  display: "swap",
  variable: "--font-avenir-arabic",
  src: [
    {
      path: "../public/fonts/AvenirArabic-Light.otf",
      style: "normal",
      weight: "400",
    },
    {
      path: "../public/fonts/AvenirArabic-Medium.otf",
      style: "normal",
      weight: "500",
    },
    {
      path: "../public/fonts/AvenirArabic-Heavy.otf",
      style: "normal",
      weight: "600",
    },
    {
      path: "../public/fonts/AvenirArabic-Heavy.otf",
      style: "normal",
      weight: "700",
    },
  ],
});

const googleTagManagerId = process.env.NEXT_PUBLIC_GTM_ID;

function App({ Component, pageProps }: AppProps) {
  const { i18n } = useTranslation();
  const dir = i18n.dir?.() || "ltr";
  useEffect(() => {
    document.dir = dir;
  }, [dir]);

  const [isNavigationLoaderVisible, setIsNavigationLoaderVisible] =
    useState(false);
  useEffect(() => {
    const showNavigationLoader = () => setIsNavigationLoaderVisible(true);
    const hideNavigationLoader = () => setIsNavigationLoaderVisible(false);

    Router.events.on("routeChangeStart", showNavigationLoader);
    Router.events.on("routeChangeComplete", hideNavigationLoader);
    Router.events.on("routeChangeError", hideNavigationLoader);

    return () => {
      Router.events.off("routeChangeStart", showNavigationLoader);
      Router.events.off("routeChangeComplete", hideNavigationLoader);
      Router.events.off("routeChangeError", hideNavigationLoader);
    };
  }, []);

  return (
    <DirectionProvider dir={dir}>
      {isNavigationLoaderVisible && (
        <div
          aria-hidden
          className="bg-gradient-to-l rtl:bg-gradient-to-r fixed left-0 right-0 top-0 z-50 h-1 animate-linear-loader from-black via-brand-primary to-black bg-[length:200%_100%]"
        />
      )}
      <main
        className={`
          ${
            i18n.language == "en"
              ? esRebondGrotesque.className
              : avenirArabic.className
          }
          ${esRebondGrotesque.variable} ${avenirArabic.variable}
          flex flex-col items-center
        `}
      >
        <Component {...pageProps} />
        <Footer />
      </main>
      {googleTagManagerId && <GoogleTagManager gtmId={googleTagManagerId} />}
    </DirectionProvider>
  );
}

export default appWithTranslation(App, nextI18NextConfig);
