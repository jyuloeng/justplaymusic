import React, { ReactNode } from "react";
import Head from "next/head";
import tw, { styled } from "twin.macro";
import Header from "./header";

export interface LayoutProps {
  children?: ReactNode;
  title?: string;
}

const Wrapper = styled.div`
  font-family: "Ubuntu", system-ui, -apple-system, BlinkMacSystemFont, segoe ui,
    Helvetica, PingFang SC, Microsoft YaHei, sans-serif;
`;

const Container = styled.div(() => [tw`container mx-auto`]);

const Layout: React.FC<LayoutProps> = ({
  children,
  title = "JustPlayMusic",
}) => {
  return (
    <Wrapper>
      <Head>
        <title>{title}</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Container>
        <Header />
        {children}
      </Container>
    </Wrapper>
  );
};

export default Layout;
