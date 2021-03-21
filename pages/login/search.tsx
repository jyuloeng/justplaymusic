import tw, { styled, css } from "twin.macro";
import { TitleBoard } from "../../components/boards";
import { Button } from "../../components/buttons";
import { Avatar } from "../../components/commons";
import { Input } from "../../components/forms";
import { IconSearch } from "../../styles/icons";
import { SmallText, MediumText, CaptionText } from "../../styles/typography";

export interface LoginSearchProps {}

const LoginSearch: React.FC<LoginSearchProps> = () => {
  return (
    <Container>
      <TitleBoardContainer>
        <TitleBoard
          title="搜索用户名登录"
          info="可以在搜索列表中选择你的账号哦~"
        />
      </TitleBoardContainer>

      <SearchInputContianer>
        <Input
          width={270}
          icon={<IconSearch />}
          placeholder={"请输入网易云用户名~"}
        />
        <SmallText>按 Enter 搜索哦~</SmallText>
      </SearchInputContianer>

      <SearchUserContainer>
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <Button
            key={item}
            icon={
              <AvatarContainer>
                <Avatar
                  src={
                    "https://p2.music.126.net/NP5ShmXQiOcqLe5xjrpjMA==/3297435383057591.jpg?param=512y512"
                  }
                />
              </AvatarContainer>
            }
            btnType={item === 1 ? "primary" : "default"}
            isShowBackground={item === 1}
            backgroundColor={item === 1 ? "primary" : "default"}
          >
            <MediumText bold>送温暖的大红帽丶</MediumText>
          </Button>
        ))}
      </SearchUserContainer>

      <ButtonContainer>
        <Button isShowBackground btnType="primary" backgroundColor="primary">
          <MediumText bold>确定</MediumText>
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default LoginSearch;

const ButtonContainer = styled.div(() => [tw`mx-5 lg:mx-10 mt-5 md:mt-10`]);

const AvatarContainer = styled.div(() => [tw`w-8 md:w-12 h-8 md:h-12`]);

const SearchUserContainer = styled.div(() => [
  tw`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 mx-5 lg:mx-10 mt-6`,
]);

const SearchInputContianer = styled.div(() => [
  tw`mx-5 lg:mx-10 mt-6 md:mt-10`,
]);

const TitleBoardContainer = styled.div(() => [tw`mx-5 lg:mx-10 mt-4 lg:mt-6`]);

const Container = styled.div(() => tw``);
