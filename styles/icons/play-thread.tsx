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
        d="M7.608 4.615a.75.75 0 00-1.108.659v13.452a.75.75 0 001.108.659l12.362-6.726a.75.75 0 000-1.318L7.608 4.615zM5 5.274c0-1.707 1.826-2.792 3.325-1.977l12.362 6.727c1.566.852 1.566 3.1 0 3.952L8.325 20.702C6.826 21.518 5 20.434 5 18.727V5.274z"
        fill={props.fill || LightModeTextColor}
      />
    </svg>
  );
}

export default SvgComponent;
