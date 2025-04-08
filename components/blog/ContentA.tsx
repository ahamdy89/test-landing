import Link from "next/link";
import type { Components } from "react-markdown";

const ContentA: Components["a"] = ({
  // react-markdown props
  // we extract them from the props so that we don't pass them to the html element
  node,
  sourcePosition,
  index,
  siblingCount,
  // end react-markdown props
  children,
  ...props
}) => {
  if (!props.href) {
    return null;
  }

  if (
    props.href.startsWith("//") ||
    props.href.startsWith("http") ||
    props.href.startsWith(":")
  ) {
    return (
      <a
        {...props}
        className="text-brand-primary-darkest"
        href={props.href}
        target="_blank"
        rel="noreferrer noopener"
      >
        {children}
      </a>
    );
  }

  return (
    <Link {...props} className="text-brand-primary-darkest" href={props.href}>
      {children}
    </Link>
  );
};

export default ContentA;
