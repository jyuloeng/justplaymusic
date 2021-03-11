import tw, { styled, css } from "twin.macro";
import { Slider } from "./index";
import { tuple } from "../../lib/type";

const MediaStatuses = tuple("repeat", "shuffle");
type MediaStatus = typeof MediaStatuses[number];

export interface MediaControlProps {
  coverPath?: string;
  name?: string;
  artists?: string[];
  url?: string;
  status?: MediaStatus;
  onLikeClick?: React.MouseEventHandler<HTMLElement>;
  onSubtitleClick?: React.MouseEventHandler<HTMLElement>;
  onStatusClick?: React.MouseEventHandler<HTMLElement>;
  onPrevClick?: React.MouseEventHandler<HTMLElement>;
  onPlayClick?: React.MouseEventHandler<HTMLElement>;
  onNextClick?: React.MouseEventHandler<HTMLElement>;
  onVolumeClick?: React.MouseEventHandler<HTMLElement>;
  
  //   Slider props
  sliderMin?: number;
  sliderMax?: number;
  sliderDisabled?: boolean;
  onSliderBeforeChange?: (value: number) => void;
  onSliderChange?: (value: number) => void;
  onSliderAfterChange?: (value: number) => void;
}

const MediaControl: React.FC<MediaControlProps> = ({
  coverPath,
  name,
  artists,
  sliderMin,
  sliderMax,
  sliderDisabled,
  onSliderBeforeChange,
  onSliderChange,
  onSliderAfterChange,
}) => {
  return (
    <Container>
      <Slider
        min={sliderMin}
        max={sliderMax}
        disabled={sliderDisabled}
        onBeforeChange={onSliderBeforeChange}
        onChange={onSliderChange}
        onAfterChange={onSliderAfterChange}
      />
    </Container>
  );
};

export default MediaControl;

const Container = styled.div(() => []);
