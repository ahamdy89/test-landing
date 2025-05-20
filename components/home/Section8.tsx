export default function Section8() {
  const cardData = [
    {
      title: "Omnichannel support",
      paragraph:
        "Whether you have a team of 2 or 2000, our technical and financial experts are always ready to help 24/7",
    },
    {
      title: "API superpowers",
      paragraph:
        "Integrate with axis and get our cutting-edge financial services at your fingertips",
    },
    {
      title: "Dedicated account manager",
      paragraph:
        "Your dedicated account manger is 1 call away whenever you have a question or need help ",
    },
  ];

  return (
    <section className="w-full">
      <div className="px-9 pt-12 text-center text-black tablet:px-20 laptop:px-52">
        <h2 className="text-[40px] font-semibold leading-[44px] tablet:leading-none laptop:leading-none">
          More than just financial management
        </h2>
        <p className="mx-auto max-w-3xl pt-8 text-[20px] font-normal">
          Powerful intuitive product with robust reporting to help you
          streamline your entire business financial operations—whether locally
          or globally{" "}
        </p>
      </div>
      <div className="mx-auto flex flex-col items-center justify-center gap-4 px-4 py-8 tablet:flex-row">
        {cardData.map((card) => (
          <div
            key={card.title}
            className="flex min-h-[9.375rem] max-w-[18.75rem] flex-col rounded-3xl border border-black px-6 py-4 text-center"
          >
            <p className="pb-6 text-xl font-semibold">{card.title}</p>
            <p className="text-sm font-medium ">{card.paragraph}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
