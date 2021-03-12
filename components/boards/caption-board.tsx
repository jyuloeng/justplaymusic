import tw, { styled, css } from "twin.macro";
import { Button } from "../buttons";
import { MainText, SmallText } from "../../styles/typography";

export interface CaptionBoardProps {
  caption: string;
  moreText?: string;
  onMoreClick?: React.MouseEventHandler<HTMLElement>;
}

const CaptionBoard: React.FC<CaptionBoardProps> = ({
  caption,
  moreText,
  onMoreClick,
}) => {
  return (
    <Container moreText={moreText}>
      <Button isShowHover={false}>
        <MainText bold>{caption}</MainText>
      </Button>
      {moreText && (
        <Button onClick={onMoreClick}>
          <SmallText bold>{moreText}</SmallText>
        </Button>
      )}
    </Container>
  );
};

export default CaptionBoard;

const Container = styled.div(({ moreText }: { moreText: string }) => [
  tw`flex items-center w-full`,
  moreText && tw`justify-between`,
]);
