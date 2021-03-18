import tw, { styled, css } from "twin.macro";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "../buttons";
import SearchInput from "../commons/search-input";
import { MediumText } from "../../styles/typography";

export interface SlideMenuProps {
  visible: boolean;
  onClose?: React.MouseEventHandler<HTMLElement>;
}

const menu: Array<{
  path: string;
  name: string;
}> = [
  {
    path: "/",
    name: "个性推荐",
  },
  {
    path: "/playlist",
    name: "歌单",
  },
  {
    path: "/ranking",
    name: "排行榜",
  },
  {
    path: "/artistlist",
    name: "歌手",
  },
  {
    path: "/zone",
    name: "个人空间",
  },
  {
    path: "/settings",
    name: "设置",
  },
];

const SlideMenu: React.FC<SlideMenuProps> = ({ visible, onClose }) => {
  const router = useRouter();

  const handleSearch = (value) => {
    console.log(value);
  };

  return (
    <Container visible={visible}>
      <MenuContainer>
        <SearchInput onSearch={handleSearch} />
        {menu.map(({ path, name }) => (
          <Link href={path} key={path}>
            <a>
              <Button
                btnType={router.pathname === path ? "primary" : "default"}
              >
                <MediumText bold>{name}</MediumText>
              </Button>
            </a>
          </Link>
        ))}
      </MenuContainer>

      <Mask onClick={onClose} />
    </Container>
  );
};

export default SlideMenu;

const MenuContainer = styled.nav(() => [
  tw`h-full p-2 flex flex-col w-64 shadow absolute bg-neutral-light dark:bg-neutral-dark 
  transform -translate-x-64 transition`,
  css`
    /* width: 196px; */
  `,
]);

const Container = styled.div<SlideMenuProps>(({ visible }) => [
  tw`fixed left-0 top-16 w-full h-full bg-neutral-light dark:bg-neutral-dark z-10 `,
  visible ? tw`block` : tw`hidden`,
  css`
    ${MenuContainer} {
      ${visible && tw`translate-x-0`}
    }
  `,
]);

const Mask = styled.div(() => [
  tw`w-full h-full bg-light-mode-text bg-opacity-40`,
]);
