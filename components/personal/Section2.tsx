import Image from "next/image";
import styles from "./section2.module.css"; // Import CSS Module
import gracias from "../../public/images/partners/gracias.png";
import kenzz from "../../public/images/partners/kenzz.png";
import cartona from "../../public/images/partners/cartona.png";
import talabat from "../../public/images/partners/talabat.png";
import khazenly from "../../public/images/partners/khazenly.png";
import bosta from "../../public/images/partners/bosta.png";

export default function Section2() {
  return (
    <section className="max-w-screen-mobile flex w-full flex-col items-center gap-14 px-8 py-10  laptop:max-w-screen-laptop">
      <div className={styles.logosContainer}>
        <Image
          className={`${styles.logo} ${styles.logo1}`}
          aria-hidden
          src={gracias}
          alt=""
        />
        <Image
          className={`${styles.logo} ${styles.logo2}`}
          aria-hidden
          src={kenzz}
          alt=""
        />
        <Image
          className={`${styles.logo} ${styles.logo3}`}
          aria-hidden
          src={cartona}
          alt=""
        />
        <Image
          className={`${styles.logo} ${styles.logo4}`}
          aria-hidden
          src={talabat}
          alt=""
        />
        <Image
          className={`${styles.logo} ${styles.logo5}`}
          aria-hidden
          src={khazenly}
          alt=""
        />
        <Image
          className={`${styles.logo} ${styles.logo6}`}
          aria-hidden
          src={bosta}
          alt=""
        />
      </div>
    </section>
  );
}
