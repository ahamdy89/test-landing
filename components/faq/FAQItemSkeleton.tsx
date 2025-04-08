import * as Accordion from "@radix-ui/react-accordion";
import { PlusIcon } from "@radix-ui/react-icons";
import classes from "./FAQItemSkeleton.module.css";

interface Props {
  index: number;
}

export default function FAQItemSkeleton({ index }: Props) {
  return (
    <Accordion.Root type="single" collapsible>
      <Accordion.Item
        value={index.toString()}
        className={`mb-5 px-5 py-2.5 ${classes["accordion-item"]} laptop:px-10 laptop:py-5`}
        key={index}
      >
        <Accordion.Header className="flex items-center justify-between">
          <div
            className={`inline-block h-full min-h-full w-11/12 ${classes.faqPlaceholder}`}
          ></div>
          <PlusIcon className="inline-block" />
        </Accordion.Header>
      </Accordion.Item>
    </Accordion.Root>
  );
}
