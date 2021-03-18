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
  backgroundColor?: ButtonType;
  isShowBackground?: boolean;
  isShowHover?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

const DefaultButton: React.FC<ButtonProps> = ({
  icon,
  children,
  btnType,
  backgroundColor,
  isShowBackground,
  isShowHover,
  onClick,
}) => {
  return (
    <Container
      onClick={onClick}
      btnType={btnType}
      backgroundColor={backgroundColor}
      isShowBackground={isShowBackground}
      isShowHover={isShowHover}
    >
      {icon && <Icon>{icon}</Icon>}
      {children}
    </Container>
  );
};

export default DefaultButton;

const Icon = styled.span(() => [tw`inline-block`]);

const Container = styled.button<ButtonProps>(
  ({
    btnType = "default",
    backgroundColor = "default",
    isShowBackground,
    isShowHover = true,
  }) => [
    tw`flex justify-center items-center p-3 rounded-lg transition`,
    css`
      ${Icon} + span {
        margin-left: 12px;
      }

      color: ${ButtonTypeColors[btnType]};

      &:active {
        transform: scale(0.92);
      }

      &:focus {
        outline: none;
      }
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
