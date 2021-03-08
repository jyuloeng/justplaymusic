import tw, { styled, css } from "twin.macro";
import { IconPlayThread } from "../../styles/icons";
import { DarkModeTextColor } from "../../styles/colors";
import { SmallText } from "../../styles/typography";

export interface PlayCountCardProps {
  count: number;
}

const iconSize = 10;

const PlayCountCard: React.FC<PlayCountCardProps> = ({ count }) => {
  return (
    <Container>
      <IconPlayThread
        width={iconSize}
        height={iconSize}
        fill={DarkModeTextColor}
      />
      <SmallText>{count} thousand</SmallText>
    </Container>
  );
};

export default PlayCountCard;

const Container = styled.div(() => [
  tw`inline-flex rounded-lg items-center`,
  css`
    padding: 0 6px;
    background: rgba(244, 245, 247, 0.3);
    backdrop-filter: blur(8px);

    & > :not(:first-child) {
      margin-left: 4px;
      color: ${DarkModeTextColor};
    }
  `,
]);
