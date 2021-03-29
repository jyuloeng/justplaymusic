// 具体文档地址：https://slider-react-component.vercel.app/
import tw, { styled, css } from "twin.macro";
import {
  BackgroundColor,
  PrimaryColor,
  Primary2Color,
} from "../../styles/colors";
import RcSlider, { SliderProps } from "rc-slider";
import "rc-slider/assets/index.css";

const Slider: React.FC<SliderProps> = ({ children, ...props }) => {
  return <StyledRcSlider {...props} />;
};

export default Slider;

const StyledRcSlider = styled(RcSlider)<SliderProps>(({ vertical = false }) => [
  tw`bg-background`,
  vertical ? tw`h-full px-0` : tw`h-2 py-0`,
  css`
    & > .rc-slider-rail {
      background-color: ${BackgroundColor};
    }

    & > .rc-slider-track {
      background-color: ${PrimaryColor};
    }

    & > .rc-slider-handle {
      border: solid 2px ${PrimaryColor};
    }

    & > .rc-slider-handle:active {
      border-color: ${Primary2Color};
      box-shadow: 0 0 5px ${Primary2Color};
      cursor: grabbing;
    }
  `,
  vertical
    ? css`
        &.rc-slider-vertical {
          width: 8px;
        }

        &.rc-slider-vertical > .rc-slider-rail {
          width: 8px;
        }

        &.rc-slider-vertical .rc-slider-track {
          left: 0;
          width: 8px;
        }

        &.rc-slider-vertical .rc-slider-handle {
          margin-left: -3px;
        }
      `
    : css`
        & > .rc-slider-rail {
          top: 0;
          height: 8px;
        }

        .rc-slider-vertical {
          left: 0;
          width: 8px;
        }

        & > .rc-slider-track {
          top: 0;
          height: 8px;
        }

        & > .rc-slider-handle {
          margin-top: -3px;
        }
      `,
]);
