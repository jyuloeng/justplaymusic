import * as React from "react"
import { LightModeTextColor } from "../colors";
import { SvgProps } from "./index";
function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
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
        d="M12.002 2c5.523 0 10.001 4.478 10.001 10.002 0 5.523-4.478 10.001-10.001 10.001C6.478 22.003 2 17.525 2 12.002 2 6.478 6.478 2 12.002 2zm0 1.5a8.502 8.502 0 100 17.003 8.502 8.502 0 000-17.003zM8.463 14.785a4.491 4.491 0 003.539 1.718 4.491 4.491 0 003.534-1.714.75.75 0 011.178.93 5.99 5.99 0 01-4.712 2.284 5.991 5.991 0 01-4.717-2.29.75.75 0 011.178-.928zm.539-6.033a1.25 1.25 0 110 2.499 1.25 1.25 0 010-2.499zm6 0a1.25 1.25 0 110 2.499 1.25 1.25 0 010-2.499z"
        fill={props.fill || LightModeTextColor}
      />
    </svg>
  )
}

export default SvgComponent
