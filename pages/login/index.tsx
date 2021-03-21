import tw, { styled, css } from "twin.macro";
import { useRouter } from "next/router";
import { TitleBoard } from "../../components/boards";
import { IntroText, SmallText } from "../../styles/typography";
import { IconRightArrow } from "../../styles/icons";
import { Primary2Color } from "../../styles/colors";

export interface LoginProps {}

const iconProps = {
  width: 20,
  height: 20,
  fill: Primary2Color,
};

const cardList = [
  {
    title: "登录网易云账号",
    subtitle: "可访问全部数据哦~",
    path: "/login/account",
  },
  {
    title: "搜索网易云账号",
    subtitle: "只能读取账号的公开信息诶~",
    path: "/login/search",
  },
];

const Login: React.FC<LoginProps> = () => {
  const router = useRouter();

  return (
    <Container>
      <TitleBoardContainer>
        <TitleBoard title="登录" info="可以尝试用以下方式登录哦~" />
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

const LoginTypeCardContainer = styled.div(() => [tw`flex flex-col items-center`]);

const TitleBoardContainer = styled.div(() => [tw`mx-5 lg:mx-10 mt-4 lg:mt-6`]);

const Container = styled.div(() => tw``);
