import tw, { styled, css } from "twin.macro";
import { Player } from "../components/controls";

export interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  return (
    <Container>
      <Player
        artists={[
          {
            name: "Bo Peep",
            id: "123456",
          },
        ]}
      />
    </Container>
  );
};

export default Footer;

const Container = styled.footer(() => [
  tw`fixed bottom-0 w-full
  bg-neutral-light dark:bg-neutral-dark`,
  css`
    z-index: 999;
  `,
]);
