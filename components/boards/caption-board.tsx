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
  moreText = "更多",
  onMoreClick,
}) => {
  return (
    <Container>
      <Button isShowHover={false}>
        <MainText bold>{caption}</MainText>
      </Button>
      <Button onClick={onMoreClick}>
        <SmallText bold>{moreText}</SmallText>
      </Button>
    </Container>
  );
};

export default CaptionBoard;

const Container = tw.div`flex justify-between items-center`;
