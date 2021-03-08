import React, { useState } from "react";
import tw, { styled } from "twin.macro";
import TopMenu from "../components/menus/top-menu";
import SlideMenu from "../components/menus/slide-menu";
import {} from "../styles/icons";

export interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const [slideMenuVisible, setSlideMenuVisible] = useState<boolean>(false);

  return (
    <>
      <Container>
        <TopMenu
          onMobileNavClick={() => setSlideMenuVisible((visible) => !visible)}
        />
      </Container>

      <SlideMenu
        visible={slideMenuVisible}
        onClose={() => setSlideMenuVisible(false)}
      />
    </>
  );
};

export default Header;

const Container = styled.header(() => [
  tw`fixed w-full xl:px-16 lg:px-4 md:px-0 bg-neutral-light dark:bg-neutral-dark`,
]);
