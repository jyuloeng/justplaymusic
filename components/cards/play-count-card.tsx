import tw, { styled, css } from "twin.macro";
import { IconPlay, IconPlayThread } from "../../styles/icons";
import { DarkModeTextColor, LightModeTextColor } from "../../styles/colors";
import { SmallText } from "../../styles/typography";
import { tuple } from "../../lib/type";

const PlayCountCardTypes = tuple("default", "solid");
export type PlayCountCardType = typeof PlayCountCardTypes[number];
export interface PlayCountCardProps {
  cardType?: PlayCountCardType;
  count: number | string;
  iconSize?: number;
}

const PlayCountCard: React.FC<PlayCountCardProps> = ({
  cardType = "default",
  count,
  iconSize = 10,
}) => {
  return (
    <Container cardType={cardType}>
      {cardType === "default" ? (
        <IconPlayThread
          width={iconSize}
          height={iconSize}
          fill={DarkModeTextColor}
        />
      ) : (
        <IconPlay
          width={iconSize}
          height={iconSize}
          fill={LightModeTextColor}
        />
      )}
      <SmallText>{count}</SmallText>
    </Container>
  );
};

export default PlayCountCard;

const Container = styled.div(
  ({ cardType }: { cardType: PlayCountCardType }) => [
    tw`inline-flex rounded-lg items-center`,
    cardType === "default"
      ? css`
          padding: 0 6px;
          background: rgba(56, 59, 101, 0.3);
          backdrop-filter: blur(8px);

          & > :not(:first-child) {
            margin-left: 4px;
            color: ${DarkModeTextColor};
          }
        `
      : css`
          & > :not(:first-child) {
            margin-left: 4px;
            color: ${LightModeTextColor};
          }
        `,
  ]
);
