import tw, { styled, css } from "twin.macro";
import { Button } from "../buttons";
import { MainText, SmallText } from "../../styles/typography";

export interface CaptionBoardProps {
  caption: string;
  moreText?: string | React.ReactNode;
  onMoreClick?: React.MouseEventHandler<HTMLElement>;
}

const CaptionBoard: React.FC<CaptionBoardProps> = ({
  caption,
  moreText,
  onMoreClick,
}) => {
  return (
    <Container>
      <Button isShowHover={false}>
        <MainText bold>{caption}</MainText>
      </Button>
      {moreText ? (
        <Button onClick={onMoreClick}>
          <SmallText bold>{moreText}</SmallText>
        </Button>
      ) : (
        <div></div>
      )}
    </Container>
  );
};

export default CaptionBoard;

const Container = styled.div(() => [
  tw`flex justify-between items-center w-full`,
]);
