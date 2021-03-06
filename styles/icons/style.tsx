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
        d="M17.404 4.722l2.717 10.142a2.75 2.75 0 01-1.944 3.368l-6.279 1.683A2.75 2.75 0 018.53 17.97L5.813 7.828A2.75 2.75 0 017.757 4.46l6.279-1.683a2.75 2.75 0 013.368 1.945zm-6.438 3.02a1 1 0 10-1.932.517 1 1 0 001.932-.518zm-5.163 3.916l1.761 6.57a3.732 3.732 0 001.002 1.714l-.442-.024a2.75 2.75 0 01-2.603-2.89l.282-5.37zm-.925-1.478l-.355 6.796c-.037.698.12 1.362.424 1.94l-.414-.161a2.75 2.75 0 01-1.582-3.553l1.927-5.022z"
        fill={props.fill || LightModeTextColor}
      />
    </svg>
  );
}

export default SvgComponent;
