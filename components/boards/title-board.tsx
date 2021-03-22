import tw, { styled, css } from "twin.macro";
import { H3, InfoText } from "../../styles/typography";
import { tuple } from "../../lib/type";

const TitleBoardTypes = tuple("default", "search");
export type TitleBoardType = typeof TitleBoardTypes[number];

export interface TitleBoardProps {
  title: string | string[];
  info?: string;
  searchPrevText?: string;
  type?: TitleBoardType;
}

const TitleBoard: React.FC<TitleBoardProps> = ({
  title,
  info,
  searchPrevText,
  type,
}) => {
  return (
    <Container>
      {type === "search" ? (
        <H3>
          {typeof title === "string" ? (
            <>
              <SearchText>{searchPrevText}</SearchText> “{title}”
            </>
          ) : (
            <>
              <SearchText>{searchPrevText}</SearchText> “{title?.join(", ")}”
            </>
          )}
        </H3>
      ) : (
        <H3>{title}</H3>
      )}
      {info && <InfoText>{info}</InfoText>}
    </Container>
  );
};

export default TitleBoard;

const Container = styled.div(() => []);

const SearchText = styled.span`
  color: #2d3436;
  opacity: 0.7;
`;
