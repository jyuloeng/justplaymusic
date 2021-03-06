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
        d="M20.026 17.001c-2.762 4.784-8.879 6.423-13.663 3.661A9.965 9.965 0 013.13 17.68a.75.75 0 01.365-1.132c3.767-1.348 5.785-2.911 6.956-5.146 1.232-2.353 1.551-4.93.689-8.464a.75.75 0 01.769-.926 9.961 9.961 0 014.457 1.327C21.149 6.1 22.788 12.218 20.025 17z"
        fill={props.fill || LightModeTextColor}
      />
    </svg>
  );
}

export default SvgComponent;
