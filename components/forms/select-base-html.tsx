import tw, { styled, css } from "twin.macro";
import { SmallText } from "../../styles/typography";
import { IconBottomArrow } from "../../styles/icons";

interface Option {
  value?: string | number;
  title?: string;
}

export interface SelectBaseHtmlProps {
  options?: Option[];
}

const iconSize = {
  width: 16,
  height: 16,
};

const SelectBaseHtml: React.FC<SelectBaseHtmlProps> = ({ options }) => {
  return (
    <Label>
      <Select>
        {options.map((option) => (
          <Option key={option.value} value={option.value}>
            {option.title}
          </Option>
        ))}
      </Select>
      <Icon {...iconSize} />
    </Label>
  );
};

export default SelectBaseHtml;

const Icon = styled(IconBottomArrow)(() => [
  tw`absolute top-2 right-2`,
  css`
    pointer-events: none;
  `,
]);

const Option = styled.option(() => [tw``]);

const Select = styled.select(() => [
  tw`w-full bg-transparent py-2 pl-3 pr-7 rounded-lg cursor-pointer 
    border border-background appearance-none outline-none truncate`,
  css`
    font-size: inherit;
    line-height: inherit;

    &::-ms-expand {
      display: none;
    }
  `,
]);

const Label = styled.div(() => [
  tw`relative bg-background rounded-lg cursor-pointer`,
  css`
    width: 180px;
    font-size: 14px;
    line-height: 16px;
  `,
]);
