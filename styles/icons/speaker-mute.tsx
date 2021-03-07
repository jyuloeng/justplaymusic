import * as React from "react";
import { LightModeTextColor } from "../colors";
import { SvgProps } from "./index";

function SvgComponent(props: SvgProps) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3.28 2.22a.75.75 0 10-1.06 1.06L6.438 7.5H4.25A2.25 2.25 0 002 9.749v4.497a2.25 2.25 0 002.25 2.25h3.68a.75.75 0 01.498.19l4.491 3.994c.806.716 2.081.144 2.081-.934V16.06l5.72 5.72a.75.75 0 001.06-1.061L3.28 2.22zm13.861 11.74l1.138 1.137A6.974 6.974 0 0019 12a6.973 6.973 0 00-.84-3.328.75.75 0 00-1.32.714c.42.777.66 1.666.66 2.614 0 .691-.127 1.351-.359 1.96zm2.247 2.246l1.093 1.094A9.956 9.956 0 0022 12a9.959 9.959 0 00-1.96-5.946.75.75 0 00-1.205.892A8.459 8.459 0 0120.5 12a8.458 8.458 0 01-1.112 4.206zM9.52 6.338l5.48 5.48V4.25c0-1.079-1.274-1.65-2.08-.934l-3.4 3.022z"
        fill={props.fill || LightModeTextColor}
      />
    </svg>
  );
}

export default SvgComponent;
