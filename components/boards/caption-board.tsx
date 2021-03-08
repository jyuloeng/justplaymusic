import tw, { styled, css } from "twin.macro";
import { Button } from "../buttons";
import { MainText, SmallText } from "../../styles/typography";

export interface CaptionBoardProps {
  caption: string;
}

const CaptionBoard: React.FC<CaptionBoardProps> = ({ caption }) => {
  return (
    <Container>
      <Button isShowHover={false}>
        <MainText bold>{caption}</MainText>
      </Button>
      <Button>
        <SmallText bold>更多</SmallText>
      </Button>
    </Container>
  );
};

export default CaptionBoard;

const Container = tw.div`flex justify-between items-center`;
