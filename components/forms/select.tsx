import { useState, useRef, useEffect, useCallback } from "react";
import tw, { styled, css } from "twin.macro";
import { IconBottomArrow } from "../../styles/icons";
import { SmallText } from "../../styles/typography";

interface Option {
  value?: string | number;
  title?: string;
}

export interface DefaultSelectProps {
  width?: number;
  options?: Option[];
  onChange?: (option: Option) => void;
}

const iconSize = {
  width: 16,
  height: 16,
};

const DefaultSelect: React.FC<DefaultSelectProps> = ({
  width = 160,
  options,
  onChange,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [selectedOption, setSelectedOption] = useState<Option>(options[0]);
  const [showOptions, setShowOptions] = useState(false);

  const handleHideOptions = useCallback(() => {
    setShowOptions(false);
  }, [setShowOptions]);

  const handleMouseOut = (e: MouseEvent) => {
    if (!ref.current.contains(e.target as Node)) {
      handleHideOptions();
      console.log(1);
    }
  };

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    onChange && onChange(option);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleMouseOut);
    document.addEventListener("touchstart", handleMouseOut);
    document.addEventListener("scroll", handleMouseOut);
    return () => {
      document.removeEventListener("mousedown", handleMouseOut);
      document.removeEventListener("touchstart", handleMouseOut);
      document.addEventListener("scroll", handleMouseOut);
    };
  }, []);

  return (
    <Container
      ref={ref}
      width={width}
      onClick={() => setShowOptions((value) => !value)}
    >
      <Label>{selectedOption.title}</Label>
      <Icon {...iconSize} />

      <Options width={width} show={showOptions}>
        {options.map((option) => (
          <Option
            key={option.value}
            value={option.value}
            onClick={() => handleOptionClick(option)}
          >
            <SmallText>{option.title}</SmallText>
          </Option>
        ))}
      </Options>
    </Container>
  );
};

export default DefaultSelect;

const Option = styled.li(() => [
  tw`px-2 py-1 rounded-lg hover:text-primary2 hover:bg-primary-background`,
]);

const Options = styled.ul(
  ({ width, show }: { width: number; show: boolean }) => [
    tw`absolute top-10 left-0 p-2 bg-neutral-light 
  border border-background rounded-lg shadow-lg z-10`,
    !show && tw`hidden`,
    css`
      width: ${width}px;
    `,
  ]
);

const Icon = styled(IconBottomArrow)(() => [
  tw`absolute top-2 right-2`,
  css`
    pointer-events: none;
  `,
]);

const Label = styled.div(() => [
  tw``,
  css`
    font-size: 14px;
    line-height: 16px;
  `,
]);

const Container = styled.div(({ width }: { width: number }) => [
  tw`relative pl-3 pr-4 py-2 bg-background rounded-lg cursor-pointer`,
  css`
    width: ${width}px;
  `,
]);
