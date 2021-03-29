import tw, { styled, css } from "twin.macro";
import { SliderProps } from "rc-slider";
import { Slider } from ".";
import { Button } from "../buttons";
import {
  IconSpeakerLarge,
  IconSpeakerLow,
  IconSpeakerMute,
} from "../../styles/icons";

export interface VolumeControlProps extends SliderProps {
  mute?: boolean;
  onIconClick?: React.MouseEventHandler<HTMLElement>;
}

const baseIconSize = {
  width: 20,
  height: 20,
};

export const VolumeIcon = ({ value, mute }: { value: number; mute }) => {
  if (mute) return <IconSpeakerMute {...baseIconSize} />;
  return value > 0 ? (
    value > 0.5 ? (
      <IconSpeakerLarge {...baseIconSize} />
    ) : (
      <IconSpeakerLow {...baseIconSize} />
    )
  ) : (
    <IconSpeakerMute {...baseIconSize} />
  );
};

const VolumeControl: React.FC<VolumeControlProps> = ({
  children,
  mute,
  value,
  onIconClick,
  ...props
}) => {
  return (
    <Container>
      <SliderContainer>
        <Slider value={value} vertical={true} {...props} />
      </SliderContainer>
      <Button
        icon={<VolumeIcon value={value} mute={mute} />}
        isShowHover={false}
        onClick={onIconClick}
      />
    </Container>
  );
};

export default VolumeControl;

const SliderContainer = styled.div(() => [
  tw`mt-5 mb-2`,
  css`
    height: 100px;
  `,
]);

const Container = styled.div(() => [
  tw`inline-flex flex-col items-center 
    bg-neutral-light rounded-md shadow-lg`,
]);
