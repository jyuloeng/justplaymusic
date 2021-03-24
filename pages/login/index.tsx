import tw, { styled, css } from "twin.macro";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { TitleBoard } from "../../components/boards";
import { IntroText, SmallText } from "../../styles/typography";
import { IconRightArrow } from "../../styles/icons";
import { Primary2Color } from "../../styles/colors";
import { isLogin } from "../../lib/auth";

export interface LoginProps {}

const iconProps = {
  width: 20,
  height: 20,
  fill: Primary2Color,
};

const Login: React.FC<LoginProps> = () => {
  const { t } = useTranslation("login");

  const router = useRouter();
  // if (isLogin()) {
  //   router.replace("/zone");
  //   return null;
  // }

  const cardList = [
    {
      title: t("login-ncloud-music-title"),
      subtitle: t("login-ncloud-music-subtitle"),
      path: "/login/account",
    },
    {
      title: t("search-ncloud-music-title"),
      subtitle: t("search-ncloud-music-subtitle"),
      path: "/login/search",
    },
  ];

  return (
    <Container>
      <TitleBoardContainer>
        <TitleBoard title={t("title")} info={t("subtitle")} />
      </TitleBoardContainer>

      <LoginTypeCardContainer>
        {cardList.map((card) => (
          <LoginTypeCard key={card.path} onClick={() => router.push(card.path)}>
            <TitleContainer>
              <Title bold>{card.title}</Title>
              <Subtitle bold>{card.subtitle}</Subtitle>
            </TitleContainer>
            <IconContainer>
              <IconRightArrow {...iconProps} />
            </IconContainer>
          </LoginTypeCard>
        ))}
      </LoginTypeCardContainer>
    </Container>
  );
};

export default Login;

const IconContainer = styled.div(() => [
  tw`invisible transform transition-all duration-500`,
  css`
    animation: fadeout 0.5s linear;

    @keyframes fadeout {
      0% {
        opacity: 1;
      }
      33% {
        opacity: 0.66;
      }
      66% {
        opacity: 0.33;
      }
      100% {
        opacity: 0;
      }
    }
  `,
]);

const Subtitle = styled(SmallText)(() => [tw`text-primary`]);

const Title = styled(IntroText)(() => [tw`text-primary2`]);

const TitleContainer = styled.div(() => [
  tw`flex flex-col transform transition-all duration-500`,
]);

const LoginTypeCard = styled.div(() => [
  tw`flex justify-center items-center pl-5 py-10 mt-6
   bg-primary-background rounded-lg cursor-pointer`,
  css`
    width: 280px;

    &:hover ${IconContainer} {
      ${[
        tw`visible translate-x-3`,
        css`
          animation: fadein 0.5s linear;

          @keyframes fadein {
            0% {
              opacity: 0;
            }
            33% {
              opacity: 0.33;
            }
            66% {
              opacity: 0.66;
            }
            100% {
              opacity: 1;
            }
          }
        `,
      ]}
    }

    &:hover ${TitleContainer} {
      ${tw`-translate-x-5`}
    }
  `,
]);

const LoginTypeCardContainer = styled.div(() => [
  tw`flex flex-col items-center`,
]);

const TitleBoardContainer = styled.div(() => [tw`mx-5 lg:mx-10 mt-4 lg:mt-6`]);

const Container = styled.div(() => tw``);
