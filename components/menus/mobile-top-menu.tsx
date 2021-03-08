import tw, { styled, css } from "twin.macro";
import { Button } from "../buttons";
import { IconNavigation } from "../../styles/icons";

export interface MobileTopMenuProps {}

const MobileTopMenu: React.FC<MobileTopMenuProps> = () => {
  return (
    <Container>
      <Button icon={<IconNavigation />}></Button>
    </Container>
  );
};

export default MobileTopMenu;

const Container = styled.nav<MobileTopMenuProps>(() => []);
