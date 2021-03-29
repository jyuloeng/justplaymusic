import React from "react";
import tw, { styled, css } from "twin.macro";
import {
  BackgroundColor,
  LightModeTextColor,
  Primary2Color,
  Secondary2Color,
  PrimaryBackgroundColor,
} from "../../styles/colors";
import { tuple } from "./../../lib/type";

const ButtonTypes = tuple("default", "primary", "secondary", "disabled");
export type ButtonType = typeof ButtonTypes[number];

const ButtonTypeColors = {
  default: LightModeTextColor,
  primary: Primary2Color,
  secondary: Secondary2Color,
};

const ButtonBackgroundColors = {
  default: BackgroundColor,
  primary: PrimaryBackgroundColor,
  secondary: BackgroundColor,
};

export interface ButtonProps {
  icon?: React.ReactNode;
  btnType?: ButtonType;
  paddingX?: number;
  paddingY?: number;
  backgroundColor?: ButtonType;
  isShowBackground?: boolean;
  isShowHover?: boolean;
  isJustifyStart?: boolean;
  marginX?: number;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

const DefaultButton: React.FC<ButtonProps> = ({
  icon,
  children,
  btnType = "default",
  paddingX,
  paddingY,
  backgroundColor = "default",
  isShowBackground,
  isShowHover = true,
  isJustifyStart,
  marginX,
  onClick,
}) => {
  return (
    <ButtonContainer
      onClick={btnType !== "disabled" ? onClick : null}
      btnType={btnType}
      paddingX={paddingX}
      paddingY={paddingY}
      backgroundColor={backgroundColor}
      isShowBackground={isShowBackground}
      isShowHover={isShowHover}
      isJustifyStart={isJustifyStart}
      marginX={marginX}
    >
      {icon && <Icon>{icon}</Icon>}
      {children}
    </ButtonContainer>
  );
};

export default DefaultButton;

const Icon = styled.span(() => [tw`inline-block`]);

const ButtonContainer = styled.button<ButtonProps>(
  ({
    btnType,
    paddingX,
    paddingY,
    backgroundColor,
    isShowBackground,
    isShowHover,
    isJustifyStart,
    marginX,
  }) => [
    tw`flex justify-center items-center p-3 rounded-lg transition`,
    isJustifyStart && tw`justify-start`,
    css`
      ${Icon} + span {
        margin-left: 8px;
      }

      @media (min-width: 768px) {
        ${Icon} + span {
          margin-left: 12px;
        }
      }

      color: ${ButtonTypeColors[btnType]};

      &:focus {
        outline: none;
      }
    `,
    marginX &&
      css`
        ${Icon} + span {
          margin-left: ${marginX}px !important;
        }
      `,
    btnType !== "disabled" &&
      css`
        &:active {
          transform: scale(0.92);
        }
      `,
    paddingX &&
      css`
        padding-left: ${paddingX * 0.25}rem;
        padding-right: ${paddingX * 0.25}rem;
      `,
    paddingY &&
      css`
        padding-top: ${paddingY * 0.25}rem;
        padding-bottom: ${paddingY * 0.25}rem;
      `,
    isShowBackground &&
      css`
        background-color: ${ButtonBackgroundColors[backgroundColor]};
      `,
    isShowHover &&
      btnType !== "disabled" &&
      css`
        &:hover {
          background-color: ${ButtonBackgroundColors[backgroundColor]};
          color: ${ButtonTypeColors[backgroundColor]};
        }
      `,
    btnType === "disabled" && [
      tw`opacity-60 cursor-not-allowed`,
      css`
        filter: grayscale(100%);
        -webkit-filter: grayscale(100%);
        -moz-filter: grayscale(100%);
        -ms-filter: grayscale(100%);
        -o-filter: grayscale(100%);
      `,
    ],
  ]
);
