import Header from "../common/Header";
import styles from "./section1.module.css";

export default function Section1() {

  return (
    <div
      className={`${styles.sectionBackground} flex w-full flex-col items-center text-black`}
    >
      <div className="w-full max-w-screen-mobile px-8 py-8 tablet:px-16 laptop:max-w-screen-laptop laptop:px-0">
        <Header/>
      </div>
      <section className="w-full">
        <div className="mx-auto flex flex-col items-center justify-between px-8 py-6 pb-10 text-center tablet:flex-auto  tablet:flex-row tablet:items-start tablet:px-16 tablet:py-32 tablet:text-start laptop:w-full laptop:max-w-screen-laptop laptop:flex-row laptop:items-center  laptop:px-0 laptop:pb-32 laptop:pt-16 laptop:text-start">
          <div className="min-w-[15rem] max-w-[25rem] pt-4">
            <p className="tablet:leading-15 text-4xl font-normal leading-10 text-white">
              Seamless financial
            </p>
            <div className="relative flex h-auto flex-col items-center gap-x-5 overflow-hidden tablet:items-start laptop:flex-row laptop:items-center">
              <p className="text-4xl font-normal leading-10 text-white">
                solutions
              </p>
              <div className="relative flex h-16 w-[18rem] items-center overflow-hidden">
                <p className={`${styles.animatedSpan} ${styles.animated1}`}>
                  Payouts
                </p>
                <p className={`${styles.animatedSpan} ${styles.animated2}`}>
                  Mobile wallet
                </p>
                <p className={`${styles.animatedSpan} ${styles.animated3}`}>
                  Remittances
                </p>
              </div>
            </div>
            <p className="text-xl text-white">
              Digitizing your local and international payments with convenient
              solutions through our Digital Wallet, Payouts, and cross border
              Remittances
            </p>
          </div>
          <div className="relative">
            <div
              className={`${styles.maskedCard} h-[242px] w-[162px] rounded-[24px] bg-white shadow-[0_4px_8px_rgba(0,0,0,0.1)] tablet:h-[395px] tablet:w-[262px]`}
            ></div>
          </div>
        </div>
      </section>
    </div>
  );
}
