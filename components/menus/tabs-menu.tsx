import React, { useState } from "react";
import tw, { styled, css } from "twin.macro";
import { Button } from "../buttons";
import { MainText, MediumText } from "../../styles/typography";

export interface TabsMenuProps {
  title?: string;
  titleIcon?: React.ReactNode;
  tabList?: Array<{
    key: string | number;
    name: string;
  }>;
  isShowTitle?: boolean;
  activeKey?: string | number;
  onTabClick?: (key: string | number) => void;
}

const TabsMenu: React.FC<TabsMenuProps> = ({
  title,
  titleIcon,
  tabList,
  isShowTitle = true,
  activeKey = tabList[0]?.key,
  onTabClick,
}) => {
  return (
    <Container isShowTitle={isShowTitle}>
      {isShowTitle && (
        <TitleContainer>
          <Button icon={titleIcon} isShowHover={false}>
            <MainText bold>{title}</MainText>
          </Button>
        </TitleContainer>
      )}

      <TabsContainer>
        {tabList?.map((item) => (
          <Tab key={item.key}>
            <Button
              isShowBackground={item.key === activeKey}
              btnType={item.key === activeKey ? "primary" : "default"}
              backgroundColor="primary"
              onClick={() => onTabClick(item.key)}
            >
              <MediumText bold>{item.name}</MediumText>
            </Button>
          </Tab>
        ))}
      </TabsContainer>
    </Container>
  );
};

export default TabsMenu;

const Tab = styled.div(() => [tw`md:mr-3`]);

const TabsContainer = styled.div(() => [tw`flex flex-wrap`]);

const TitleContainer = styled.div(() => [tw`hidden md:block`])

const Container = styled.div(({ isShowTitle }: { isShowTitle: boolean }) => [
  tw`grid items-start gap-2`,
  css`
    grid-template-columns: repeat(
      ${isShowTitle ? 2 : 1},
      minmax(0, max-content)
    );
  `,
]);
