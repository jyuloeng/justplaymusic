import React, { useState } from "react";
import tw, { styled, css } from "twin.macro";
import { useRouter } from "next/router";
import TopMenu from "../components/menus/top-menu";
import SlideMenu from "../components/menus/slide-menu";

export interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const router = useRouter();
  const [slideMenuVisible, setSlideMenuVisible] = useState<boolean>(false);

  const handleSearch = (value) => {
    router.push("/search/" + value);
  };

  return (
    <>
      <Container>
        <TopMenu
          onNicknameClick={() => router.push("/zone")}
          onMobileNavClick={() => setSlideMenuVisible((visible) => !visible)}
          onSearch={handleSearch}
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
  css`
    z-index: 9999;
  `,
]);
