import Image from "next/image";
import type {
  BlogRecord,
  CategoryAttributes,
} from "../../server/headlessCMSHTTP/types";
import classes from "./CategoryDetailsSection.module.css";

interface Props {
  category: BlogRecord<CategoryAttributes>;
}
export default function CategoryDetailsSection({ category }: Props) {
  const {
    attributes: {
      illustration: { data: illustration },
    },
  } = category;
  return (
    <div className="max-w-screen-mobile w-full p-8 laptop:max-w-screen-laptop">
      <div
        className={`col-span-full mb-10 flex justify-center overflow-hidden rounded-[2rem] px-12 py-4 ${
          classes[`bg-${category.attributes.color || "teal"}`]
        }`}
      >
        <div className="grid grow grid-cols-2 grid-rows-1 items-center">
          <svg
            viewBox="0 0 20 10"
            xmlns="http://www.w3.org/2000/svg"
            className="col-start-1 col-end-3 row-start-1 row-end-2 overflow-visible laptop:col-start-1 laptop:col-end-2"
          >
            <circle
              r="15"
              cx="6"
              cy="5"
              className={classes[`fill-${category.attributes.color || "teal"}`]}
            />
          </svg>
          <div className="col-start-1 col-end-3 row-start-1 row-end-2 flex h-full flex-col justify-center gap-4">
            <h1>{category.attributes.title}</h1>
            <p className="text-2xl">{category.attributes.description}</p>
          </div>
        </div>
        {illustration != null && (
          <Image
            className="hidden w-1/4 shrink-0 object-contain laptop:block"
            width={illustration.attributes.width}
            height={illustration.attributes.height}
            src={`${process.env.NEXT_PUBLIC_CMS_BASE_URL!}${
              illustration.attributes.url
            }`}
            alt={illustration.attributes.alternativeText || ""}
          />
        )}
      </div>
    </div>
  );
}
