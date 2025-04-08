import type { DocumentContext, DocumentInitialProps } from "next/document";
import NextDocument, { Head, Html, Main, NextScript } from "next/document";
import { i18n } from "../next-i18next.config";

class Document extends NextDocument {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps & { locale: string }> {
    const initialProps = await NextDocument.getInitialProps(ctx);

    return { ...initialProps, locale: ctx?.locale || i18n.defaultLocale };
  }

  render() {
    return (
      <Html dir={this.props.locale === "ar" ? "rtl" : "ltr"}>
        <Head />

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
