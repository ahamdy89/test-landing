import Head from "next/head";

interface Props {
  title: string;
  description: string;
  locale: string;
  ogType?: "website" | "article" | "profile";
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: {
    src: string;
    width: number;
    height: number;
  };
  twitterCardType: "summary" | "summary_large_image" | "app";
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: {
    src: string;
    width: number;
    height: number;
  };
}
export default function Metadata({
  title,
  description,
  locale,
  ogType = "website",
  ogTitle = title,
  ogDescription = description,
  ogImage,
  twitterCardType,
  twitterTitle = ogTitle,
  twitterDescription = ogDescription,
  twitterImage = ogImage,
}: Props) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {/* #region  OG Meta tags*/}
      <meta property="og:type" content={ogType} />
      <meta property="og:locale" content={locale} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:site_name" content={ogTitle} />
      <meta itemProp="name" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta itemProp="description" content={ogDescription} />
      {ogImage && (
        <>
          <meta property="og:image" content={ogImage.src} />
          <meta property="og:image:width" content={`${ogImage.width}`} />
          <meta property="og:image:height" content={`${ogImage.height}`} />
          <meta itemProp="image" content={ogImage.src} />
          <meta itemProp="width" content={`${ogImage.width}`} />
          <meta itemProp="height" content={`${ogImage.height}`} />
        </>
      )}
      {/* #endregion  OG Meta tags*/}
      {/* #region  Twitter Meta tags*/}
      <meta name="twitter:site" content="@axis_app" />
      <meta name="twitter:app:country" content="EG" />
      <meta name="twitter:card" content={twitterCardType} />
      <meta name="twitter:title" content={twitterTitle} />
      <meta name="twitter:description" content={twitterDescription} />
      {twitterImage && <meta name="twitter:image" content={twitterImage.src} />}
      {twitterCardType == "app" && (
        <>
          <meta
            name="twitter:app:name:iphone"
            content={process.env.NEXT_PUBLIC_APPLE_STORE_APP_NAME}
          />
          <meta
            name="twitter:app:id:iphone"
            content={process.env.NEXT_PUBLIC_APPLE_STORE_APP_ID}
          />
          <meta
            name="twitter:app:url:iphone"
            content={process.env.NEXT_PUBLIC_APPLE_STORE_APP_URL}
          />
          <meta
            name="twitter:app:name:ipad"
            content={process.env.NEXT_PUBLIC_APPLE_STORE_APP_NAME}
          />
          <meta
            name="twitter:app:id:ipad"
            content={process.env.NEXT_PUBLIC_APPLE_STORE_APP_ID}
          />
          <meta
            name="twitter:app:url:ipad"
            content={process.env.NEXT_PUBLIC_APPLE_STORE_APP_URL}
          />
          <meta
            name="twitter:app:name:googleplay"
            content={process.env.NEXT_PUBLIC_GOOGLE_STORE_APP_NAME}
          />
          <meta
            name="twitter:app:id:googleplay"
            content={process.env.NEXT_PUBLIC_GOOGLE_STORE_APP_ID}
          />
          <meta
            name="twitter:app:url:googleplay"
            content={process.env.NEXT_PUBLIC_GOOGLE_STORE_APP_URL}
          />
        </>
      )}
      {/* #endregion  Twitter Meta tags*/}
    </Head>
  );
}
