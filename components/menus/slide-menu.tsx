import tw, { styled, css } from "twin.macro";
import Link from "next/link";
import RcDrawer from "rc-drawer";
import { useRouter } from "next/router";
import { IDrawerProps } from "rc-drawer/lib/IDrawerPropTypes";
import { MenuItem } from "./index";
import { Button } from "../buttons";
import SearchInput from "../commons/search-input";
import { MediumText } from "../../styles/typography";

export interface SlideMenuProps extends IDrawerProps {
  menu?: MenuItem[];
  searchPlaceholder?: string;
  onSearch?: (value: string) => void;
}

const SlideMenu: React.FC<SlideMenuProps> = ({
  menu,
  open,
  searchPlaceholder,
  onClose,
  onSearch,
}) => {
  const router = useRouter();

  const handleSearch = (value) => {
    onSearch(value);
  };

  return (
    <RcDrawer open={open} onClose={onClose} level={null} handler={false} className="slide-menu">
      <Container>
        <SearchInput onSearch={handleSearch} placeholder={searchPlaceholder} />
        <MenuContainer>
          {menu?.map(({ path, name }) => (
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
      </Container>
    </RcDrawer>
  );
};

export default SlideMenu;

const MenuContainer = styled.nav(() => []);

const Container = styled.div<SlideMenuProps>(() => [tw`p-3`]);
