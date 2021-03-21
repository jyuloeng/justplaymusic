import { useState } from "react";
import tw, { styled, css } from "twin.macro";
import { TitleBoard } from "../../components/boards";
import { Input } from "../../components/forms";
import {
  IconNCloudLogo,
  IconEmail,
  IconLock,
  IconPhone,
} from "../../styles/icons";
import { MediumText, SmallText } from "../../styles/typography";

export interface LoginAccountProps {}

const LoginAccount: React.FC<LoginAccountProps> = () => {
  const [isEmailLogin, setIsEmailLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginTypeChange = () => {
    setIsEmailLogin((value) => !value);
    isEmailLogin ? setPhone("") : setEmail("");
  };

  return (
    <Container>
      <TitleBoardContainer>
        <TitleBoard title="登录网易云账号" info="可使用邮箱或手机号登录哦~" />
      </TitleBoardContainer>

      <FormContainer>
        <IconNCloudLogo />
        <Title bold>网易云音乐</Title>

        {isEmailLogin ? (
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            width={270}
            icon={<IconEmail />}
            placeholder={"Email"}
          />
        ) : (
          <Input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            width={270}
            icon={<IconPhone />}
            placeholder={"Phone"}
          />
        )}
        <div style={{ marginBottom: 12 }}></div>
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          width={270}
          type="password"
          icon={<IconLock />}
          placeholder={"Password"}
        />

        <LoginButton>
          <LoginButtonText bold>登录</LoginButtonText>
        </LoginButton>

        <ChangeLoginType onClick={handleLoginTypeChange}>
          {isEmailLogin ? "使用手机号登录" : "使用邮箱登录"}
        </ChangeLoginType>

        <Divider />

        <Description>
          <DescriptionText>
            justplaymusic
            承诺不会保存你的任何账号信息到云端，您的密码会在本地进行 MD5
            加密后再传输到网易云 API
          </DescriptionText>
          <DescriptionText>
            justplaymusic 并非网易云官方网站，输入账号信息前请慎重考虑，
            你也可以前往{" "}
            <DescriptionLink
              href="https://github.com/oddii/justplaymuisc"
              target="_blank"
            >
              justplaymusic 的 GitHub 源代码仓库
            </DescriptionLink>
            自行构建并使用自托管的网易云 API
          </DescriptionText>
        </Description>
      </FormContainer>
    </Container>
  );
};

export default LoginAccount;

const DescriptionLink = styled.a(() => [tw`hover:underline`]);

const DescriptionText = styled.div(() => [
  tw`opacity-80`,
  css`
    width: 270px;
  `,
]);

const Description = styled.div(() => [tw``]);

const Divider = styled.div(
  () => tw`w-full h-1 mt-12 mb-3 bg-primary opacity-60`,
  css`
    height: 1px;
  `
);

const ChangeLoginType = styled(SmallText)(() => [
  tw`cursor-pointer transform transition`,
  css`
    &:active {
      transform: scale(0.92);
    }
  `,
]);

const LoginButtonText = styled(MediumText)(() => [tw`text-primary2`]);

const LoginButton = styled.div(() => [
  tw`mt-8 mb-5 py-2 bg-primary-background rounded-lg 
    text-center cursor-pointer transform transition`,
  css`
    width: 270px;
    &:active {
      transform: scale(0.92);
    }
  `,
]);

const Title = styled(MediumText)(() => [tw`mt-6 mb-10`]);

const FormContainer = styled.div(() => [
  tw`flex flex-col items-center mx-auto mt-12`,
  css`
    width: 270px;
  `,
]);

const TitleBoardContainer = styled.div(() => [tw`mx-5 lg:mx-10 mt-4 lg:mt-6`]);

const Container = styled.div(() => tw``);
