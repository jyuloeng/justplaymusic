import tw, { styled, css } from "twin.macro";
import { Avatar } from "../commons";
import { Button } from "../buttons";
import { InfoText, CaptionText } from "../../styles/typography";

export interface MiniAvatarCardProps {
  coverPath?: string;
  caption?: string;
  buttonText?: string;
  buttonIcon?: React.ReactNode;
}

const MiniAvatarCard: React.FC<MiniAvatarCardProps> = ({
  coverPath,
  caption,
  buttonIcon,
  buttonText,
}) => {
  return (
    <Container>
      <Avatar src={coverPath} />
      <Caption>{caption}</Caption>
      <ButtonContainer>
        <Button icon={buttonIcon}>
          <InfoText>{buttonText}</InfoText>
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default MiniAvatarCard;

const ButtonContainer = styled.div(() => [tw`justify-self-end`]);

const Caption = styled(CaptionText)(() => [tw`truncate`]);

const Container = styled.div(() => [
  tw`grid gap-x-3 items-center px-1`,
  css`
    grid-template-columns: 12% auto auto;
  `,
]);
