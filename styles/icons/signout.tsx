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
        d="M11.997 19.25v-6.146l-.001-.505-7.441.001 1.722 1.724a.75.75 0 01.072.976l-.072.085a.75.75 0 01-.977.072l-.084-.073-2.996-2.997a.75.75 0 01-.073-.976l.072-.084 2.997-3.004A.75.75 0 016.35 9.3l-.072.084L4.565 11.1h7.431V4.353a.75.75 0 01.881-.738l8.5 1.501a.75.75 0 01.62.739v11.998a.75.75 0 01-.629.74l-8.5 1.396a.75.75 0 01-.871-.74zm3.497-7.146a1.002 1.002 0 100-2.004 1.002 1.002 0 000 2.004zm-4.497-7.001h-.766l-.101.007a.75.75 0 00-.649.744l.008 4.25h1.508V5.103zm-.002 8.501l.002 1.275v3.725h-.746a.75.75 0 01-.743-.647l-.007-.102-.006-4.25h1.5z"
        fill={props.fill || LightModeTextColor}
      />
    </svg>
  );
}

export default SvgComponent;
