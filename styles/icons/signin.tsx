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
        d="M12 4.354v6.651l7.442-.001-1.723-1.724a.75.75 0 01-.072-.976l.073-.084a.75.75 0 01.976-.073l.084.073 2.997 2.997a.75.75 0 01.073.976l-.073.084-2.996 3.004a.75.75 0 01-1.134-.975l.072-.085 1.713-1.717-7.431.001L12 19.25a.75.75 0 01-.88.739l-8.5-1.502A.75.75 0 012 17.75V5.75a.75.75 0 01.628-.74l8.5-1.396a.75.75 0 01.872.74zM8.502 11.5a1.002 1.002 0 100 2.004 1.002 1.002 0 000-2.004zM13 18.501h.765l.102-.006a.75.75 0 00.648-.745l-.007-4.25H13v5.001zM13.002 10L13 8.725V5h.745a.75.75 0 01.743.647l.007.102.007 4.251h-1.5z"
        fill={props.fill || LightModeTextColor}
      />
    </svg>
  );
}

export default SvgComponent;
