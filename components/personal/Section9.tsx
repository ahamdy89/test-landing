import { useTranslation } from "next-i18next";

export default function Section9() {
  const { t } = useTranslation(["personal", "common"]);

  return (
    <section className="flex w-full items-center justify-center px-8 py-10">
      <div className="max-w-screen-mobile flex w-full flex-col items-center gap-y-10 rounded-[2.5rem] bg-revers-background-gradient px-16 py-8 tablet:max-w-screen-tablet tablet:flex-row tablet:gap-14 laptop:max-w-screen-laptop laptop:gap-36">
        {/* Left block */}
        <div className="w-full text-center ">
          <p className="pb-4 text-2xl font-semibold text-black">
            Seamless business finances
          </p>
          <p className="text-sm font-normal text-white">
            Pay thousands of beneficiaries, suppliers,vendors, staff—all with
            superb reporting, and more with Axis business
          </p>
        </div>

        {/* Divider */}
        <div className="block h-0.5 w-40 bg-white tablet:h-40 tablet:w-0.5  laptop:block laptop:h-40 laptop:w-0.5" />

        {/* Right block */}
        <div className="w-full text-center">
          <p className="pb-4 text-2xl font-semibold text-black">
            Money with no borders
          </p>
          <p className="text-sm font-normal text-white ">
            Process instant international payments into Egypt with our top-notch
            API integration
          </p>
        </div>
      </div>
    </section>
  );
}
