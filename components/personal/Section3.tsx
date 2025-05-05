import Image from "next/image";
import { useTranslation, Trans } from "next-i18next";
import section3IllustrationURL from "../../public/images/personal/section-3-illustration.png";
import section2IconURL from "../../public/images/personal/section-2-icon.png";

interface Props {
  openGetStartedModal: () => void;
  openVideoModal: () => void;
  setVideoUrl: (videoUrl: string) => void;
  locale: string;
}
export default function Section3({
  openGetStartedModal,
  openVideoModal,
  setVideoUrl,
  locale,
}: Props) {
  const { t } = useTranslation(["personal", "common"]);

  return (
    <section className="w-full">
      <div className="gap-14 px-9 py-6 pb-10 text-center tablet:px-20 laptop:px-52">
        <h2 className="py-6 text-4xl font-semibold">
          A look into our growing ecosystem
        </h2>
        <p className="text-xl text-[#6D6C6C]">
          Scaling the future of payments, one product at a time{" "}
        </p>
      </div>

      <div className="bg-main-background-gradient py-16 text-white">
        <div className="mx-auto flex max-w-screen-laptop flex-col items-center justify-evenly gap-y-14 tablet:flex-row laptop:flex-row">
          <div className="flex flex-col items-center justify-center gap-2">
            <p className="text-[34px] font-semibold">
              EGP <span className="text-5xl">6M+</span>
            </p>
            <p className="text-xl font-semibold">Processed transactions</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <p className="text-[34px] font-semibold">
              EGP <span className="text-5xl">12B+</span>
            </p>
            <p className="text-xl font-semibold">Processed volume</p>
          </div>
          <div className="flex flex-col items-center justify-center  gap-y-2">
            <p className="text-5xl font-semibold">200K+</p>
            <p className="text-xl font-semibold">axis wallet downloads</p>
          </div>
        </div>
      </div>
    </section>
  );
}
