import React, { useState, useRef } from "react";
import tw, { styled, css } from "twin.macro";
import {
  Primary2Color,
  BackgroundColor,
  PrimaryBackgroundColor,
  LightModeTextColor,
} from "../../styles/colors";

export interface DefaultInputProps {
  width?: number;
  value?: string;
  type?: string;
  icon?: React.ReactElement;
  placeholder?: string;
  isFontBold?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onEnterPress?: (value: string) => void;
  isCanPressEnter?: boolean;
}

const DefaultInput: React.FC<DefaultInputProps> = ({
  width,
  value,
  type,
  icon,
  placeholder = "Please input your value",
  isFontBold = false,
  onChange,
  onEnterPress: onSearch,
  isCanPressEnter,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === "enter") {
      if (inputRef.current.value && onSearch) {
        onSearch(inputRef.current.value);
      }
    }
  };

  return (
    <Container
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
      active={isActive}
      width={width}
    >
      <Icon>
        {React.cloneElement(icon, { fill: isActive ? Primary2Color : null })}
      </Icon>
      <Input
        placeholder={isActive ? "" : placeholder}
        ref={inputRef}
        value={value}
        type={type}
        onChange={onChange}
        onKeyDown={isCanPressEnter ? handleInputKeyDown : null}
        isFontBold={isFontBold}
      />
    </Container>
  );
};

export default DefaultInput;

const Input = styled.input(({ isFontBold }: { isFontBold: boolean }) => [
  tw`ml-3`,
  css`
    width: 100%;
    font-size: 16px;
    line-height: 24px;

    &:focus {
      outline: none;
    }
  `,
  isFontBold &&
    css`
      font-weight: bold;
    `,
]);

const Icon = styled.div(() => []);

const Container = styled.div<{ width?: number; active: boolean }>(
  ({ width, active }) => [
    tw`flex items-center py-2 px-3 rounded-lg`,
    css`
      &,
      ${Input} {
        background-color: ${active ? PrimaryBackgroundColor : BackgroundColor};
        color: ${active ? Primary2Color : LightModeTextColor};
      }
    `,
    width &&
      css`
        width: ${width}px;
      `,
  ]
);
