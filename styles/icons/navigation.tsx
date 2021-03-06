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
        d="M3.772 18.345H20.23c.426 0 .771.37.771.827 0 .42-.29.766-.667.82L20.23 20H3.772c-.426 0-.771-.37-.771-.828 0-.419.29-.765.667-.82l.104-.008H20.23 3.772zm0-7.171H20.23c.426 0 .771.37.771.828 0 .419-.29.765-.667.82l-.104.007H3.772c-.426 0-.771-.37-.771-.828 0-.418.29-.765.667-.82l.104-.007H20.23 3.772zm0-7.174h16.456c.426 0 .771.37.771.828 0 .419-.29.765-.667.82l-.104.008H3.77c-.426 0-.771-.371-.771-.828 0-.42.29-.766.667-.82L3.77 4h16.457H3.77z"
        fill={props.fill || LightModeTextColor}
      />
    </svg>
  );
}

export default SvgComponent;
