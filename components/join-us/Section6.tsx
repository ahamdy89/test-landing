import Link from "next/link";
import Image from "next/image";
import section6PhotoLaptopURL from "../../public/images/join-us/section-6-photo-laptop.png";
import section6PhotoMobileURL from "../../public/images/join-us/section-6-photo-mobile.png";

export default function Section6() {
  return (
    <section className="grid w-full place-items-center text-white">
      <Image
        aria-hidden
        src={section6PhotoMobileURL}
        className="col-span-full row-span-full block w-full laptop:hidden"
        alt=""
      />
      <Image
        aria-hidden
        src={section6PhotoLaptopURL}
        className="col-span-full row-span-full hidden w-full laptop:block"
        alt=""
      />
      <div className="max-w-screen-mobile col-span-full row-span-full flex flex-col items-center gap-5 p-8 laptop:max-w-screen-laptop">
        <h2 className="text-center text-[2.5rem] laptop:text-5xl">
          Ready to start the next chapter of your career?
        </h2>
        <Link
          href="/jobs-board"
          className="rounded-full border-2 border-black bg-white px-8 py-1 text-lg font-medium text-black solid-shadow-brand-primary"
        >
          See Open Roles
        </Link>
      </div>
    </section>
  );
}
