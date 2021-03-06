import React from "react";
import tw, { styled } from "twin.macro";
import {} from "../styles/icons";

export interface HeaderProps {}

const Container = styled.header(() => [tw``]);

const Header: React.FC<HeaderProps> = () => {
  return <Container>header</Container>;
};

export default Header;
