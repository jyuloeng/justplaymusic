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
        d="M12.82 5.58l-.82.822-.824-.823a5.375 5.375 0 10-7.601 7.601l7.895 7.896a.75.75 0 001.06 0l7.902-7.897a5.376 5.376 0 00-.001-7.6 5.38 5.38 0 00-7.611 0zm6.548 6.541L12 19.485 4.635 12.12a3.875 3.875 0 115.48-5.48l1.358 1.357a.75.75 0 001.073-.013L13.88 6.64a3.88 3.88 0 015.487 5.481z"
        fill={props.fill || LightModeTextColor}
      />
    </svg>
  );
}

export default SvgComponent;
