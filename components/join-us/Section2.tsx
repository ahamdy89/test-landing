import Link from "next/link";

interface CardProps {
  title: string;
  linkURL: string;
}
function Card({ title, linkURL: _linkURL }: CardProps) {
  return (
    <div className="flex w-full flex-col items-center gap-5 rounded-3xl bg-white py-12 laptop:grow laptop:basis-3/12">
      <h3>{title}</h3>
      <Link
        href="/jobs-board"
        className="rounded-full border-2 border-black bg-white px-10 py-1 text-lg font-medium text-black solid-shadow-brand-primary"
      >
        See Jobs
      </Link>
    </div>
  );
}

export default function Section2() {
  return (
    <section className="max-w-screen-mobile flex w-full flex-col items-center gap-14 px-8 py-28 bg-bleed-brand-primary-light laptop:max-w-screen-laptop">
      <h2>What is your passion?</h2>
      <div className="flex w-full flex-col flex-wrap gap-3 px-8 laptop:flex-row laptop:gap-x-4 laptop:gap-y-6">
        {/* Card 1 */}
        <Card title="Product" linkURL="" />
        {/* Card 2 */}
        <Card title="Operations" linkURL="" />
        {/* Card 3 */}
        <Card title="Engineering" linkURL="" />
        {/* Card 4 */}
        <Card title="Finance" linkURL="" />
        {/* Card 5 */}
        <Card title="Growth" linkURL="" />
        {/* Card 6 */}
        <Card title="People" linkURL="" />
      </div>
    </section>
  );
}
