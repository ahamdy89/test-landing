import Link from "next/link";
import { useRouter } from "next/router";
import Header from "../common/Header";
import { useTranslation, Trans } from "next-i18next";
import * as Accordion from "@radix-ui/react-accordion";
import { PlusIcon, MinusIcon } from "@radix-ui/react-icons";
import classes from "./section1.module.css";
import Image from "next/image";
import sectionOneImage from "../../public/images/contact-support/faqs.png";
import FAQItemSkeleton from "./FAQItemSkeleton";

interface Props {
  faqData: Array<{ question: string; answer: string }>;
  isLoading: boolean;
}

export default function Section1({ faqData, isLoading }: Props) {
  const { t } = useTranslation(["common", "faq"]);
  const { query, pathname } = useRouter();

  return (
    <>
      <div className="max-w-screen-mobile w-full p-8 laptop:max-w-screen-laptop">
        <Header>
          <nav className="col-start-1 col-end-4 row-start-2 row-end-3 flex justify-center laptop:col-start-2 laptop:col-end-3 laptop:row-start-1 laptop:row-end-2">
            <ul className="flex rounded-full text-base font-bold ring-2 ring-inset ring-black">
              <li className="flex items-center rounded-full border-black bg-black text-white">
                <Link
                  href="/personal"
                  className="rounded-full px-4 py-1 laptop:px-6 laptop:py-2"
                >
                  <Trans t={t} i18nKey="common:HEADER_PERSONAL" />
                </Link>
              </li>
              <li className="flex items-center">
                <Link
                  href="/"
                  className="rounded-full px-4 py-1 laptop:px-6 laptop:py-2"
                >
                  <Trans t={t} i18nKey="common:HEADER_BUSINESS" />
                </Link>
              </li>
            </ul>
          </nav>
        </Header>
      </div>
      <div className="max-w-screen-mobile flex w-full flex-col p-8 laptop:max-w-screen-laptop">
        <div className="flex laptop:justify-between">
          <div className="grid w-full laptop:w-2/3">
            <div className="self-end">
              <h1 className="mb-6 w-full text-5xl">
                <Trans t={t} i18nKey="faq:FAQ" />
              </h1>
              <Trans t={t} i18nKey="faq:EVERYTHING_YOU_NEED_TO_KNOW" />
            </div>
            <div className="mb-2.5 mt-5 flex self-end">
              <ul className="flex gap-2">
                <li
                  className={`${
                    query?.type?.includes("business")
                      ? classes.inactiveTab
                      : classes.activeTab
                  } flex items-center rounded-md px-2 py-1 text-xs`}
                >
                  <Link
                    href={{
                      pathname,
                      query: {
                        ...query,
                        type: "personal",
                        page: 1,
                      },
                    }}
                  >
                    <Trans t={t} i18nKey="faq:PERSONAL_FAQS" />
                  </Link>
                </li>
                <li
                  className={`${
                    query?.type?.includes("business")
                      ? classes.activeTab
                      : classes.inactiveTab
                  } flex items-center rounded-md px-2 py-1 text-xs`}
                >
                  <Link
                    href={{
                      pathname,
                      query: {
                        ...query,
                        type: "business",
                        page: 1,
                      },
                    }}
                  >
                    <Trans t={t} i18nKey="faq:BUSINESS_FAQS" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <Image
            src={sectionOneImage}
            placeholder="blur"
            alt="get-in-touch-image"
            className="self-en hidden h-auto w-40 laptop:flex"
          />
        </div>

        <div className="w-full">
          <Accordion.Root type="single" collapsible>
            {isLoading
              ? Array.from({ length: 8 }).map((_, index) => (
                  <FAQItemSkeleton index={index} key={index} />
                ))
              : faqData.map((faq, index) => {
                  return (
                    <Accordion.Item
                      value={index.toString()}
                      className={`mb-5 px-5 py-2.5 ${classes["accordion-item"]} laptop:px-10 laptop:py-5`}
                      key={index}
                    >
                      <Accordion.Header>
                        <Accordion.Trigger
                          className={classes["accordion-trigger"]}
                        >
                          <span className="text-start text-xl font-semibold laptop:text-2xl">
                            {faq.question}
                          </span>
                          <PlusIcon className={classes["open-icon"]} />
                          <MinusIcon className={classes["close-icon"]} />
                        </Accordion.Trigger>
                      </Accordion.Header>
                      <Accordion.Content
                        className={`text-sm ${classes["accordion-content"]} laptop:text-base`}
                      >
                        {faq.answer}
                      </Accordion.Content>
                    </Accordion.Item>
                  );
                })}
          </Accordion.Root>
        </div>
      </div>
    </>
  );
}
