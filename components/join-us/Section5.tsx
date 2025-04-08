import Link from "next/link";
import { useState } from "react";

const slides: Array<Omit<CardProps, "containerId">> = [
  {
    containerClassName: "bg-brand-primary-light",
    paragraphClassName: "text-brand-primary-dark",
    title: "EMPOWER CUSTOMERS",
    paragraph:
      "Our customers are at the heart of everything we do, so every day we obsess about making their experience with us better",
  },
  {
    containerClassName: "bg-bronze-light",
    paragraphClassName: "text-bronze-dark",
    title: "OWN IT",
    paragraph:
      "We are drivers not passengers. We take initiative and responsibility regardless of our role or experience level.",
  },
  {
    containerClassName: "bg-pink-light",
    paragraphClassName: "text-pink-dark",
    title: "KEEP IT SIMPLE",
    paragraph:
      "Whether it comes to our product, design, or pricing, we seek to simplify our offering as much as possible for customers. We don’t believe in hidden fees, fine print or complicated language.",
  },
  {
    containerClassName: "bg-blue-light",
    paragraphClassName: "text-blue-dark",
    title: "TAKE ACTION",
    paragraph:
      "In other words we get shit done. Delivering our best today is more important than waiting for the perfect solution tomorrow.",
  },
  {
    containerClassName: "bg-brand-primary-light",
    paragraphClassName: "text-brand-primary-dark",
    title: "BE IMPACTFUL",
    paragraph:
      "We aim to have a positive and lasting impact on the people around us (inside and outside the organization). We seek to drive change and positivity.",
  },
  {
    containerClassName: "bg-bronze-light",
    paragraphClassName: "text-bronze-dark",
    title: "STAY HUMBLE",
    paragraph:
      "We’re confident in our strengths and knowledge while also aware of our need to constantly improve, adapt and learn as we grow the team and the company.",
  },
  {
    containerClassName: "bg-pink-light",
    paragraphClassName: "text-pink-dark",
    title: "CHALLENGE AND BE CHALLENGED",
    paragraph:
      "We are open to having our ideas questioned (there’s no such thing as a stupid question!), listening to new perspectives, accepting feedback, and respecting different opinions. And then we back the best idea 100%, wherever it comes from.",
  },
  {
    containerClassName: "bg-blue-light",
    paragraphClassName: "text-blue-dark",
    title: "BUILD TRUST",
    paragraph:
      "We believe that honesty is the best way forward. We tell the truth, even when it’s a difficult truth, to our users, peers, colleagues, investors and advisors. We don’t distort reality to sugar coat things. We are constantly building relationships of trust both internally and externally.",
  },
  {
    containerClassName: "bg-brand-primary-light",
    paragraphClassName: "text-brand-primary-dark",
    title: "LEARN EVERY DAY",
    paragraph:
      "We are open to learning every day and to be proven wrong. We are led by data and not set on our previously held opinions and biases. We are not afraid to experiment to improve our products & offerings.",
  },
  {
    containerClassName: "bg-bronze-light",
    paragraphClassName: "text-bronze-dark",
    title: "NEVER SETTLE",
    paragraph:
      "We don’t take things as a given. We always want to improve on the status quo. We are always trying to push the envelope to come up with innovative solutions, and to better ourselves, our products, and services.",
  },
];

interface CardProps {
  containerId: string;
  containerClassName: string;
  paragraphClassName: string;
  title: string;
  paragraph: string;
}
function Card({
  containerId,
  containerClassName,
  title,
  paragraphClassName,
  paragraph,
}: CardProps) {
  return (
    <div
      id={containerId}
      className={`flex w-screen shrink-0 snap-start flex-col items-center justify-center px-4 ${containerClassName}`}
    >
      <div className="max-w-screen-mobile flex flex-col gap-7 rounded-3xl bg-white p-6 laptop:max-w-screen-laptop">
        <h3 className="text-center text-5xl font-semibold">{title}</h3>
        <p className={`${paragraphClassName} text-xl`}>{paragraph}</p>
      </div>
    </div>
  );
}
export default function Section5() {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  return (
    <section className="isolate grid w-full grid-cols-1 grid-rows-3">
      {/* Section header */}
      <div className="pointer-events-none z-10 col-start-1 col-end-2 row-start-1 row-end-2 flex max-w-max flex-col items-center gap-3 justify-self-center py-20 laptop:py-16">
        <h2 className="pointer-events-auto text-4xl">Our core values</h2>
        <p className="pointer-events-auto text-xl">What drives us at axis</p>
      </div>
      <svg
        viewBox="0 0 100 10"
        className="relative z-10 col-start-1 col-end-2 row-start-3 row-end-4 mb-16 h-4 w-40 self-center justify-self-center"
        aria-hidden
      >
        <mask id="circles">
          {slides.map((_, index) => (
            <circle
              key={index}
              r={3.5}
              cx={5 + index * 10}
              cy={5}
              fill="white"
            />
          ))}
        </mask>
        <g mask="url(#circles)">
          {slides.map((_, index) => (
            <Link
              key={index}
              aria-label={`go to slide number ${index + 1}`}
              href={`#slide-${index + 1}`}
              className="outline-1 outline-gray-600"
            >
              <rect
                cursor="pointer"
                fill="white"
                height={10}
                width={10}
                y={0}
                x={index * 10}
              />
            </Link>
          ))}
          <rect
            fill="black"
            height={10}
            width={10}
            y={0}
            x={scrollPercentage * 100}
          />
        </g>
      </svg>
      <div
        onScroll={(event) => {
          setScrollPercentage(
            event.currentTarget.scrollLeft / event.currentTarget.scrollWidth
          );
        }}
        className="col-start-1 col-end-2 row-span-full flex snap-x snap-mandatory overflow-x-auto scroll-smooth"
      >
        {slides.map(
          (
            { containerClassName, paragraphClassName, title, paragraph },
            index
          ) => (
            <Card
              key={index}
              containerId={`slide-${index + 1}`}
              containerClassName={containerClassName}
              paragraphClassName={paragraphClassName}
              title={title}
              paragraph={paragraph}
            />
          )
        )}
      </div>
    </section>
  );
}
