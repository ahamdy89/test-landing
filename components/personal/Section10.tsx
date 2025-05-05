import { useTranslation } from "next-i18next";
import faqIcon from "../../public/images/common/faq-icon.png";
import Image from "next/image";

export default function Section10() {
  const { t } = useTranslation("personal");

  const faqData = [
    {
      question: "What is Axis?",
      answer:
        "Axis is an Egyptian fintech company licensed by the Central Bank of Egypt, building the mobile money infrastructure for Egypt and beyond. Axis offers three core solutions tailored for both individuals and businesses: Axis Wallet, Axis Payouts, and Axis Remittance.",
    },
    {
      question: "What is Axis Payouts?",
      answer:
        "Axis Payouts simplifies financial operations for businesses, enabling instant and reliable disbursements to mobile wallets (instantly), or bank accounts or prepaid cards in Egypt.",
    },
    {
      question: "What is Axis mobile wallet?",
      answer:
        "Axis Wallet provides Egyptians with a secure and user-friendly digital account for instant money transfers, bill payments, and online and offline shopping via a virtual Visa card.",
    },
    {
      question: "What is Axis Remittances?",
      answer:
        "Axis Remittances facilitates global transfers into Egypt, offering businesses instant, secure international payments to wallets, bank accounts, or as cash payouts.",
    },
  ];

  return (
    <section className="flex w-full flex-col items-center justify-center py-16 ">
      <div className="flex w-full flex-row justify-center gap-8 bg-main-background-gradient py-6 text-white">
        <h2 className="text-5xl font-semibold">FAQ’s</h2>
      </div>

      <div className="m flex flex-col items-center justify-center">
        {faqData.map((faq, index) => (
          <div
            key={faq.question}
            className={` flex flex-col items-center gap-6 px-10 py-10 tablet:flex-row tablet:items-start ${
              index !== faqData.length - 1 ? "border-b border-black" : ""
            }`}
          >
            <div className="flex w-full flex-col items-center ">
              <div className="flex items-center gap-2 pb-2 ">
                <Image
                  src={faqIcon}
                  alt="FAQ Icon"
                  className=" left-6 block h-7 w-7"
                />
                <p className=" text-xl font-semibold text-black ">
                  {faq.question}
                </p>
              </div>
              <p className="max-w-2xl py-4 text-center text-sm font-normal text-black">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
