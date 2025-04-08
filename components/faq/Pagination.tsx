import { useRouter } from "next/router";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import type { ComponentProps, PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  pagesCount: number;
  queryParamKey?: string;
}

export default function Pagination({
  pagesCount,
  queryParamKey = "page",
}: Props) {
  const { query, pathname } = useRouter();
  const page = Number(query.page) || 1;

  return (
    <div className="flex items-center gap-2">
      <PaginationLink
        href={{
          pathname,
          query: {
            ...query,
            [queryParamKey]: Math.max(page - 1, 1),
          },
        }}
        disabled={page == 1}
      >
        <ChevronLeftIcon
          className=" text-lg rtl:rotate-180"
          width="1em"
          height="1em"
        />
      </PaginationLink>
      {page != 1 && (
        <PaginationLink
          href={{
            pathname,
            query: {
              ...query,
              [queryParamKey]: 1,
            },
          }}
        >
          1
        </PaginationLink>
      )}
      {page > 3 && (
        <PaginationLink
          href={{
            pathname,
            query: {
              ...query,
              [queryParamKey]: page - 2,
            },
          }}
        >
          ...
        </PaginationLink>
      )}
      {page > 2 && (
        <PaginationLink
          href={{
            pathname,
            query: {
              ...query,
              [queryParamKey]: page - 1,
            },
          }}
        >
          {page - 1}
        </PaginationLink>
      )}
      <PaginationLink
        href={{
          pathname,
          query: {
            ...query,
            [queryParamKey]: page,
          },
        }}
        isSelected
      >
        {page}
      </PaginationLink>
      {page < pagesCount - 1 && (
        <PaginationLink
          href={{
            pathname,
            query: {
              ...query,
              [queryParamKey]: page + 1,
            },
          }}
        >
          {page + 1}
        </PaginationLink>
      )}
      {page < pagesCount - 2 && (
        <PaginationLink
          href={{
            pathname,
            query: {
              ...query,
              [queryParamKey]: page + 2,
            },
          }}
        >
          ...
        </PaginationLink>
      )}
      {page < pagesCount && (
        <PaginationLink
          href={{
            pathname,
            query: {
              ...query,
              [queryParamKey]: pagesCount,
            },
          }}
        >
          {pagesCount}
        </PaginationLink>
      )}
      <PaginationLink
        href={{
          pathname,
          query: {
            ...query,
            [queryParamKey]: page + 1,
          },
        }}
        disabled={page == pagesCount}
      >
        <ChevronRightIcon
          className="text-lg rtl:rotate-180"
          width="1em"
          height="1em"
        />
      </PaginationLink>
    </div>
  );
}

type PaginationLinkProps = PropsWithChildren<{
  href: ComponentProps<typeof Link>["href"];
  disabled?: boolean;
  isSelected?: boolean;
}>;
function PaginationLink({
  href,
  disabled = false,
  isSelected = false,
  children,
}: PaginationLinkProps) {
  if (disabled) {
    return (
      <div className="grid cursor-not-allowed place-items-center text-gray-300">
        {children}
      </div>
    );
  }

  return (
    <Link
      href={href}
      className={`relative grid min-w-[16px] place-items-center leading-none text-black ${
        isSelected
          ? "font-bold before:absolute before:bottom-0 before:left-0 before:right-0 before:-z-10 before:h-1.5 before:bg-brand-primary/40 before:content-['']"
          : ""
      }`}
      shallow
    >
      {children}
    </Link>
  );
}
