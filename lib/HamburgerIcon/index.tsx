import classes from "./index.module.css";

interface Props {
  className?: string;
  isOpen: boolean;
}
export default function HamburgerIcon({ className, isOpen }: Props) {
  return (
    <svg
      className={`${classes["burger-icon"]} ${className || ""}`}
      data-state={isOpen ? "open" : undefined}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path className={classes["top-line"]} d="M23,6 H1 V23 H23 L12,12" />
      <path className={classes["middle-line"]} d="M1,12 H23 V23 H1 L23,1" />
      <path className={classes["bottom-line"]} d="M1,18 H23 V1 H1 L12,12" />
    </svg>
  );
}
