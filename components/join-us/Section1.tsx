import Link from "next/link";
import Image from "next/image";
import Header from "../common/Header";
import section1PhotoLaptopURL from "../../public/images/join-us/section-1-photo-laptop.png";
import section1PhotoMobileURL from "../../public/images/join-us/section-1-photo-mobile.png";

export default function Section1() {
  return (
    <div className="grid w-full grid-rows-[min-content_1fr] place-items-center text-white">
      <Image
        aria-hidden
        src={section1PhotoMobileURL}
        className="col-span-full row-span-full block w-full laptop:hidden"
        alt=""
      />
      <Image
        aria-hidden
        src={section1PhotoLaptopURL}
        className="col-span-full row-span-full hidden w-full laptop:block"
        alt=""
      />
      <div className="max-w-screen-mobile col-span-full row-start-1 row-end-2 flex w-full justify-center p-8 laptop:max-w-screen-laptop">
        <Header />
      </div>
      <section className="max-w-screen-mobile col-span-full row-start-2 row-end-3 flex flex-col items-center gap-5 p-8 laptop:max-w-screen-laptop">
        <h1 className="text-center text-[2.5rem] laptop:text-5xl">
          Come <span className="text-brand-primary">join us</span> to
          revolutionize digital payments!
        </h1>
        <Link
          href="/jobs-board"
          className="rounded-full border-2 border-black bg-white px-8 py-1 text-lg font-medium text-black solid-shadow-brand-primary"
        >
          See Open Roles
        </Link>
      </section>
    </div>
  );
}
