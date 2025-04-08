interface CardProps {
  className: string;
  title: string;
  paragraph: string;
}
function Card({ className, title, paragraph }: CardProps) {
  return (
    <div
      className={`flex min-h-[10rem] w-full flex-col items-start gap-2 rounded-3xl bg-white p-6 laptop:grow laptop:basis-5/12 ${className}`}
    >
      <h3>{title}</h3>
      <p>{paragraph}</p>
    </div>
  );
}

export default function Section3() {
  return (
    <section className="max-w-screen-mobile flex w-full flex-col items-center gap-14 px-8 py-28 bg-bleed-bronze-light laptop:max-w-screen-laptop">
      <h2>Why work for axis?</h2>
      <div className="flex w-full flex-col flex-wrap gap-5 px-8 laptop:flex-row">
        {/* Card 1 */}
        <Card
          className="solid-shadow-pink"
          title="Cutting edge"
          paragraph="Solve the most interesting problems in FinTech"
        />
        {/* Card 2 */}
        <Card
          className="solid-shadow-blue"
          title="Values"
          paragraph="Work with like-minded people who are humble, wicked smart, and want
            to make a difference"
        />
        {/* Card 3 */}
        <Card
          className="solid-shadow-brand-primary"
          title="Impact"
          paragraph="You have the opportunity to have a positive impact on millions of
            people"
        />
        {/* Card 4 */}
        <Card
          className="solid-shadow-bronze"
          title="Diverse"
          paragraph="We come from all backgrounds and are proud to be 40% female but are
            working on getting to 50%!"
        />
        {/* Card 5 */}
        <Card
          className="solid-shadow-pink"
          title="Mentorship"
          paragraph="We pair you with a mentor inside the company so that they can help
            you grow in your current role and guide you on important career
            decisions!"
        />
        {/* Card 6 */}
        <Card
          className="solid-shadow-blue"
          title="Fun"
          paragraph="We love having cook-offs, ordering breakfast together, and playing
            video games in our gaming room!"
        />
        {/* Card 7 */}
        <Card
          className="solid-shadow-brand-primary"
          title="Benefits"
          paragraph="You get medical insurance and a free gym membership at the Greek
            Campus!"
        />
        {/* Card 8 */}
        <Card
          className="solid-shadow-bronze"
          title="We give back"
          paragraph="We match charitable donations and offer lots of opportunities to
            volunteer."
        />
      </div>
    </section>
  );
}
