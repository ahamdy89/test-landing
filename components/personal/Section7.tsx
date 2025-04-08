import Image from "next/image";
import { useTranslation, Trans } from "next-i18next";
import section7RaniaGaafarPhoto from "../../public/images/personal/section-7-rania-gaafar-photo.png";
import section7AhmedDewiderPhoto from "../../public/images/personal/section-7-ahmed-dewider-photo.png";
import section7BerihanSalehPhoto from "../../public/images/personal/section-7-berihan-saleh-photo.png";
import starIcon from "../../public/images/common/star-icon.png";

export default function Section7() {
  const { t } = useTranslation(["personal", "common"]);

  const peoples = [
    {
      img: section7RaniaGaafarPhoto,
      name: "Rania Gaafar",
      position: "CEO & Co-Founder",
      company: "ADVA",
    },
    {
      img: section7AhmedDewiderPhoto,
      name: "Ahmed Dewidar ",
      position: "CEO & Co-Founder",
      company: "Khazenly",
    },
    {
      img: section7BerihanSalehPhoto,
      name: "Berihan Saleh",
      position: "Founder & Chef ",
      company: "Gracias",
    },
  ];

  return (
    <section className="w-full">
      <div className="bg-main-background-gradient px-9 py-12 text-center text-white tablet:px-20 laptop:px-52">
        <h2 className="text-4xl font-semibold ">
          Don’t just take our word for it!
        </h2>
        <p className="mx-auto max-w-2xl pt-8 text-xl font-semibold">
          See what our clients have to say about how Axis has transformed their
          operations, enhanced security, and saved time!
        </p>
      </div>
      <div className="mx-auto flex justify-start gap-4 overflow-x-scroll px-4 py-12 scrollbar-hide tablet:justify-center laptop:overflow-x-hidden">
        {peoples.map((people) => (
          <div
            key={people.name}
            className="flex min-w-[19.875rem]  flex-col rounded-[3.4rem] bg-off-white-card p-2.5"
          >
            <Image
              src={people.img}
              alt={people.name}
              className="max-h-[17rem] max-w-[18.5rem]"
            />
            <div className="flex justify-between px-7 pb-8 pt-4">
              <div className="text-black ">
                <p className="text-xs font-medium">{people.name}</p>
                <p className="text-xs font-medium">{people.position}</p>
                <p className="text-xs font-medium">{people.company}</p>
              </div>
              <div className="gap.05 flex items-start">
                <Image src={starIcon} alt="star-icon" />
                <Image src={starIcon} alt="star-icon" />
                <Image src={starIcon} alt="star-icon" />
                <Image src={starIcon} alt="star-icon" />
                <Image src={starIcon} alt="star-icon" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
