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
        d="M12 4.75a7.25 7.25 0 107.201 6.406c-.068-.588.358-1.156.95-1.156.515 0 .968.358 1.03.87a9.25 9.25 0 11-3.432-6.116V4.25a1 1 0 112.001 0v2.698l.034.052h-.034v.25a1 1 0 01-1 1h-3a1 1 0 110-2h.666A7.219 7.219 0 0012 4.75z"
        fill={props.fill || LightModeTextColor}
      />
    </svg>
  );
}

export default SvgComponent;
