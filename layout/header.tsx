import React from "react";
import tw, { styled } from "twin.macro";
import TopMenu from "../components/top-menu";
import {} from "../styles/icons";

export interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <Container>
      <TopMenu />
    </Container>
  );
};

export default Header;

const Container = styled.header(() => [
  tw`fixed w-full xl:px-16 lg:px-4 md:px-0 bg-neutral-light dark:bg-neutral-dark`,
]);
