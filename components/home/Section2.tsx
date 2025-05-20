import Image from "next/image";
import styles from "./section2.module.css"; // Import CSS Module
import gracias from "../../public/images/partners/gracias.webp";
import kenzz from "../../public/images/partners/kenzz.webp";
import cartona from "../../public/images/partners/cartona.webp";
import talabat from "../../public/images/partners/talabat.webp";
import khazenly from "../../public/images/partners/khazenly.webp";
import bosta from "../../public/images/partners/bosta.webp";

export default function Section2() {
  return (
    <section className="flex w-full max-w-screen-mobile flex-col items-center gap-14 py-10">
      <div className={styles.logosContainer}>
        <Image
          priority
          className={`${styles.logo} ${styles.logo1}`}
          aria-hidden
          src={gracias}
          alt="gracias"
          placeholder="blur"
          blurDataURL="/images/placeholder.png"
        />
        <Image
          priority
          className={`${styles.logo} ${styles.logo2}`}
          aria-hidden
          src={kenzz}
          alt="kenzz"
          placeholder="blur"
          blurDataURL="/images/placeholder.png"
        />
        <Image
          className={`${styles.logo} ${styles.logo3}`}
          aria-hidden
          src={cartona}
          alt="cartona"
          placeholder="blur"
          blurDataURL="/images/placeholder.png"
        />
        <Image
          className={`${styles.logo} ${styles.logo4}`}
          aria-hidden
          src={talabat}
          alt="talabat"
          placeholder="blur"
          blurDataURL="/images/placeholder.png"
        />
        <Image
          className={`${styles.logo} ${styles.logo5}`}
          aria-hidden
          src={khazenly}
          alt="khazenly"
          placeholder="blur"
          blurDataURL="/images/placeholder.png"
        />
        <Image
          className={`${styles.logo} ${styles.logo6}`}
          aria-hidden
          src={bosta}
          alt="bosta"
          placeholder="blur"
          blurDataURL="/images/placeholder.png"
        />
      </div>
    </section>
  );
}
