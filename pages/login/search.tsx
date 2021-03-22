import { useState, useEffect } from "react";
import tw, { styled, css } from "twin.macro";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { TitleBoard } from "../../components/boards";
import { Button } from "../../components/buttons";
import { Avatar } from "../../components/commons";
import { Input } from "../../components/forms";
import { useSearchUsers } from "../../hooks";
import { IconLeftArrow, IconRightArrow, IconSearch } from "../../styles/icons";
import {
  SmallText,
  MediumText,
  MainText,
  CaptionText,
} from "../../styles/typography";
import { useAppDispatch, useAppSelector } from "../../store";
import { setUser, selectUser } from "../../store/slice/user.slice";

export interface LoginSearchProps {}

const limit = 24;

const LoginSearch: React.FC<LoginSearchProps> = () => {
  const { t } = useTranslation("login");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const [keywords, setKeywords] = useState("");
  const [offset, setOffset] = useState(0);
  const [activeUserId, setActiveUserId] = useState(0);

  const { searchUsersRes } = useSearchUsers({
    limit,
    offset: offset * limit,
    keywords,
  });

  const handlePrevPage = () => {
    if (offset > 0) {
      setOffset((value) => value - 1);
    }
  };

  const handleNextPage = () => {
    if (searchUsersRes?.hasMore) {
      setOffset((value) => value + 1);
    }
  };

  const handleLogin = () => {
    const user = searchUsersRes?.userprofiles?.find(
      (user) => user.userId === activeUserId
    );
    dispatch(setUser(user));
  };

  useEffect(() => {
    if (user) {
      // todo 没问题的时候打开这个
      // router.replace("/")
    }
  }, [user]);

  return (
    <Container>
      <TitleBoardContainer>
        <TitleBoard
          title={t("search-ncloud-music-title")}
          info={t("search-ncloud-music-caption")}
        />
      </TitleBoardContainer>

      <SearchInputContianer>
        <Input
          width={270}
          icon={<IconSearch />}
          placeholder={t("search-placeholder")}
          isCanPressEnter
          onEnterPress={(value) => setKeywords(value)}
        />
        <SmallText>{t("search-placeholder-subtitle")}</SmallText>
      </SearchInputContianer>

      {searchUsersRes?.userprofiles.length > 0 ? (
        <>
          <SearchUserContainer>
            {searchUsersRes?.userprofiles?.map((user) => (
              <Button
                key={user.userId}
                icon={
                  <AvatarContainer>
                    <Avatar src={user.avatarUrl + "?params=100y100"} />
                  </AvatarContainer>
                }
                btnType={user.userId === activeUserId ? "primary" : "default"}
                isShowBackground={user.userId === activeUserId}
                backgroundColor={
                  user.userId === activeUserId ? "primary" : "default"
                }
                isJustifyStart
                onClick={() => setActiveUserId(user.userId)}
              >
                <MediumText bold>{user.nickname}</MediumText>
              </Button>
            ))}
          </SearchUserContainer>

          {searchUsersRes?.userprofiles.length > 0 && (
            <ButtonContainer>
              {activeUserId ? (
                <Button
                  isShowBackground
                  btnType="primary"
                  backgroundColor="primary"
                  onClick={handleLogin}
                >
                  <MediumText bold>{t("confirm")}</MediumText>
                </Button>
              ) : (
                <div></div>
              )}

              <Paginator>
                {offset > 0 && (
                  <Button icon={<IconLeftArrow />} onClick={handlePrevPage} />
                )}
                {searchUsersRes?.hasMore && (
                  <Button icon={<IconRightArrow />} onClick={handleNextPage} />
                )}
                <Page bold>Page&nbsp;&nbsp;{offset + 1}</Page>
              </Paginator>
            </ButtonContainer>
          )}
        </>
      ) : (
        <TipsContainer>
          <MainText bold>
            {keywords ? "No Search Result" : "Please Search~"}
          </MainText>
        </TipsContainer>
      )}
    </Container>
  );
};

export default LoginSearch;

const TipsContainer = styled.div(() => [
  tw`flex justify-center items-center mx-5 lg:mx-10 my-5 md:my-10 p-10`,
]);

const Page = styled(CaptionText)(() => [tw`ml-3`]);

const Paginator = styled.div(() => [tw`flex items-center`]);

const ButtonContainer = styled.div(() => [
  tw`flex justify-between mx-5 lg:mx-10 my-5 md:my-10`,
]);

const AvatarContainer = styled.div(() => [tw`w-8 md:w-12 h-8 md:h-12`]);

const SearchUserContainer = styled.div(() => [
  tw`grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 mx-5 lg:mx-10 mt-6`,
]);

const SearchInputContianer = styled.div(() => [
  tw`mx-5 lg:mx-10 mt-6 md:mt-10`,
]);

const TitleBoardContainer = styled.div(() => [tw`mx-5 lg:mx-10 mt-4 lg:mt-6`]);

const Container = styled.div(() => tw``);
