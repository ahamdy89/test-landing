import type { Components } from "react-markdown";

const ContentIFrame: Components["iframe"] = ({
  // react-markdown props
  // we extract them from the props so that we don't pass them to the html element
  node,
  sourcePosition,
  index,
  siblingCount,
  // end react-markdown props
  ...props
}) => {
  return (
    <iframe {...props} className="my-6 w-full rounded-3xl object-contain" />
  );
};

export default ContentIFrame;
