export default function Section9() {

  return (
    <section className="flex w-full items-center justify-center px-8 py-10">
      <div className="flex w-full max-w-screen-mobile flex-col items-center justify-center gap-y-10 rounded-[2.5rem] bg-revers-background-gradient px-16 py-8 tablet:w-full tablet:flex-row tablet:gap-14 laptop:max-w-[63rem]">
        {/* Left block */}
        <div className="flex w-4/5 flex-col items-center pb-[1%] pt-[2%] text-center">
          <p className="pb-4 text-2xl font-semibold text-white">
            Seamless business finances
          </p>
          <p className="text-center text-sm font-normal text-white tablet:w-[71%] laptop:w-[71%]">
            Pay thousands of beneficiaries, suppliers, vendors, staff—all with
            superb reporting, and more with axis business
          </p>
        </div>

        {/* Divider */}
        <div className="top-3 block h-0.5 w-full bg-white tablet:h-40 tablet:w-0.5  laptop:block laptop:h-40 laptop:w-0.5" />

        {/* Right block */}
        <div className="flex w-4/5 flex-col items-center pb-[1%] pt-[2%] text-center">
          <p className="pb-4 text-2xl font-semibold text-white">
            Money with no borders
          </p>
          <p className="text-center text-sm font-normal text-white  tablet:w-[71%] laptop:w-[71%]">
            Process instant international payments into Egypt with our top-notch
            API integration
          </p>
        </div>
      </div>
    </section>
  );
}
