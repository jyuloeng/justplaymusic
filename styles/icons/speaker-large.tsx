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
        d="M15 4.25v15.496c0 1.078-1.274 1.65-2.08.934l-4.492-3.994a.75.75 0 00-.498-.19H4.25A2.25 2.25 0 012 14.247V9.75a2.25 2.25 0 012.25-2.25h3.68a.75.75 0 00.498-.19l4.491-3.993C13.726 2.599 15 3.17 15 4.25zm3.992 1.647a.75.75 0 011.049.157A9.959 9.959 0 0122 12a9.96 9.96 0 01-1.96 5.946.75.75 0 01-1.205-.892A8.459 8.459 0 0020.5 12a8.459 8.459 0 00-1.665-5.054.75.75 0 01.157-1.049zM17.143 8.37a.75.75 0 011.017.303c.536.99.84 2.125.84 3.328a6.973 6.973 0 01-.84 3.328.75.75 0 01-1.32-.714c.42-.777.66-1.666.66-2.614s-.24-1.837-.66-2.614a.75.75 0 01.303-1.017z"
        fill={props.fill || LightModeTextColor}
      />
    </svg>
  );
}

export default SvgComponent;
