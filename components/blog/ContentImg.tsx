import type { Components } from "react-markdown";

const ContentImg: Components["img"] = ({
  // react-markdown props
  // we extract them from the props so that we don't pass them to the html element
  node,
  sourcePosition,
  index,
  siblingCount,
  // end react-markdown props
  ...props
}) => {
  if (!props.src) {
    return null;
  }

  const src =
    props.src.startsWith("//") ||
    props.src.startsWith("http") ||
    props.src.startsWith(":")
      ? props.src
      : `${process.env.NEXT_PUBLIC_CMS_BASE_URL!}${props.src}`;

  return (
    <img
      {...props}
      className="my-6 w-full rounded-3xl object-contain"
      src={src}
    />
  );
};

export default ContentImg;
