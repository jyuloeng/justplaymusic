import React, { ReactNode } from "react";
import Head from "next/head";
import tw, { styled, css } from "twin.macro";
import Header from "./header";

export interface LayoutProps {
  children?: ReactNode;
  title?: string;
}

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
      <Header />
      <Container>{children}</Container>
    </Wrapper>
  );
};

export default Layout;

const Wrapper = styled.div(() => [
  tw`bg-neutral-light dark:bg-neutral-dark`,
  css`
    font-family: "Ubuntu", system-ui, -apple-system, BlinkMacSystemFont,
      segoe ui, Helvetica, PingFang SC, Microsoft YaHei, sans-serif !important;
  `,
]);

const Container = styled.div(() => [
  tw`container mx-auto`,
  css`
    padding-top: 86px;
  `,
]);
