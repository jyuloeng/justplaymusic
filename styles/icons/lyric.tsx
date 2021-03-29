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
        d="M7 2a1 1 0 01.94.658l2.882 7.926-1.11 2.798L9.208 12H4.79l-.851 2.342a1 1 0 01-1.88-.684l4-11A1 1 0 017 2zM5.52 10h2.963L7 5.926 5.52 10zm9.848-3.472a1 1 0 00-1.859 0L8.151 20.022H8a1 1 0 100 2h.81a.89.89 0 00.04 0H11a1 1 0 100-2h-.697L11.106 18h6.652l.802 2.023H18a1 1 0 000 2H21.008a1 1 0 100-2h-.297L15.368 6.528zm1.6 9.472H11.9l2.537-6.39 2.53 6.39z"
        fill={props.fill || LightModeTextColor}
      />
    </svg>
  );
}

export default SvgComponent;
