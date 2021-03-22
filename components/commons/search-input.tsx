import { useState, useRef } from "react";
import tw, { styled, css } from "twin.macro";
import { IconSearch } from "../../styles/icons";
import {
  Primary2Color,
  BackgroundColor,
  PrimaryBackgroundColor,
  LightModeTextColor,
} from "../../styles/colors";

export interface SearchInputProps {
  placeholder?: string;
  //   onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>;
  onSearch?: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ placeholder, onSearch }) => {
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
      onClick={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
      active={isActive}
    >
      <Icon>
        <IconSearch fill={isActive ? Primary2Color : null} />
      </Icon>
      <Input
        placeholder={isActive ? "" : placeholder}
        ref={inputRef}
        onKeyDown={handleInputKeyDown}
      />
    </Container>
  );
};

export default SearchInput;

const Input = styled.input(() => [
  tw`ml-3`,
  css`
    width: 120px;
    font-size: 16px;
    line-height: 24px;
    font-weight: bold;

    &:focus {
      outline: none;
    }
  `,
]);

const Icon = styled.div(() => []);

const Container = styled.div<{ active: boolean }>(({ active }) => [
  tw`flex items-center py-2 px-3 rounded-lg`,
  css`
    &,
    ${Input} {
      background-color: ${active ? PrimaryBackgroundColor : BackgroundColor};
      color: ${active ? Primary2Color : LightModeTextColor};
    }
  `,
]);
