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
        d="M6.75 2a.75.75 0 00-.75.75v7a5.751 5.751 0 005 5.701v5.057L8.753 20.5a.75.75 0 00-.006 1.5l3 .011h.005l3.5-.011a.75.75 0 00-.004-1.5l-2.748.009v-5.053A6.251 6.251 0 0018 9.25v-6.5a.75.75 0 00-.75-.75H6.75zm.75 5V3.5h9V7h-9zm8.183 2.707a3.727 3.727 0 01-1.159 2.066 3.753 3.753 0 01-1.754.898.5.5 0 01-.205-.979 2.736 2.736 0 001.286-.658 2.763 2.763 0 00.85-1.515.5.5 0 01.982.188z"
        fill={props.fill || LightModeTextColor}
      />
    </svg>
  );
}

export default SvgComponent;
