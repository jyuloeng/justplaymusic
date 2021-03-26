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

const ButtonTypes = tuple("default", "primary", "secondary");
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
  onClick?: React.MouseEventHandler<HTMLElement>;
}

const DefaultButton: React.FC<ButtonProps> = ({
  icon,
  children,
  btnType,
  paddingX,
  paddingY,
  backgroundColor,
  isShowBackground,
  isShowHover,
  isJustifyStart,
  onClick,
}) => {
  return (
    <ButtonContainer
      onClick={onClick}
      btnType={btnType}
      paddingX={paddingX}
      paddingY={paddingY}
      backgroundColor={backgroundColor}
      isShowBackground={isShowBackground}
      isShowHover={isShowHover}
      isJustifyStart={isJustifyStart}
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
    btnType = "default",
    paddingX,
    paddingY,
    backgroundColor = "default",
    isShowBackground,
    isShowHover = true,
    isJustifyStart,
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

      &:active {
        transform: scale(0.92);
      }

      &:focus {
        outline: none;
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
      css`
        &:hover {
          background-color: ${ButtonBackgroundColors[backgroundColor]};
          color: ${ButtonTypeColors[backgroundColor]};
        }
      `,
  ]
);
