import { ChangeEventHandler } from "react";
import tw, { styled, css } from "twin.macro";

export interface DefaultSwitchProps {
  checked?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const DefaultSwitch: React.FC<DefaultSwitchProps> = ({ checked, onChange }) => {
  return <Switch type="checkbox" checked={checked} onChange={onChange} />;
};

export default DefaultSwitch;

const Switch = styled.input(() => [
  tw`relative h-7 bg-background rounded-2xl outline-none 
    appearance-none cursor-pointer transition-colors duration-500`,
  css`
    width: 52px;

    &::after {
      content: "";
      ${tw`absolute top-1 left-1 inline-block w-5 h-5 
      rounded-2xl bg-neutral-light transition-all duration-500`}
    }

    &:checked {
      ${tw`bg-primary opacity-80`}
    }

    &:checked::after {
      content: "";
      ${tw`absolute top-1 left-7`}
    }
  `,
]);

const Container = styled.div(() => [tw``]);
