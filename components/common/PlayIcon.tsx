import type { SVGAttributes } from "react";

export default function PLayIcon(props: SVGAttributes<SVGSVGElement>) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      {...props}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M9 17.5C13.6944 17.5 17.5 13.6944 17.5 9C17.5 4.30558 13.6944 0.5 9 0.5C4.30558 0.5 0.5 4.30558 0.5 9C0.5 13.6944 4.30558 17.5 9 17.5ZM12.7172 8.2017L7.66164 5.45101C7.06691 5.15364 6.32352 5.59969 6.32352 6.26881V11.7702C6.32352 12.4394 7.06694 12.8854 7.66164 12.588L12.6426 9.83736C13.3117 9.54 13.3119 8.57345 12.7172 8.2017Z"
        fill="white"
      />
    </svg>
  );
}
