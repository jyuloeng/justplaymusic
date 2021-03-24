import { useState, useEffect } from "react";
import tw, { styled, css } from "twin.macro";
import { useRouter } from "next/router";
import { toast } from "../../lib/toast";
import useTranslation from "next-translate/useTranslation";
import { TitleBoard } from "../../components/boards";
import { Input } from "../../components/forms";
import {
  IconNCloudLogo,
  IconEmail,
  IconLock,
  IconPhone,
  IconEarth,
} from "../../styles/icons";
import { MediumText, SmallText } from "../../styles/typography";
import {
  useMutateUserLoginByPhone,
  useMutateUserLoginByEmail,
  useUserProfile,
  MutateUserLoginResponse,
} from "../../hooks";
import { useAppDispatch } from "../../store";
import { setToken, setUser, setLoginMode } from "../../store/slice/user.slice";
import {
  setCookies,
  getAuthCookie,
  isLogin,
  getMd5Password,
} from "../../lib/auth";
import { clearSpace } from "../../lib/util";

export interface LoginAccountProps {}

const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const LoginAccount: React.FC<LoginAccountProps> = () => {
  const { t } = useTranslation("login");
  const router = useRouter();
  // if (isLogin()) {
  //   router.replace("/zone");
  //   return null;
  // }

  const dispatch = useAppDispatch();

  const [authCookie, setAuthCookie] = useState("");
  const [isEmailLogin, setIsEmailLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginTypeChange = () => {
    setIsEmailLogin((value) => !value);
    isEmailLogin ? setPhone("") : setEmail("");
  };

  const {
    mutateAsync: mutateUserLoginByPhoneAsync,
  } = useMutateUserLoginByPhone();
  const {
    mutateAsync: mutateUserLoginByEmailAsync,
  } = useMutateUserLoginByEmail();

  const handleLogin = () => {
    if (password === "") {
      return toast(t("validation-none-password"));
    }

    if (isEmailLogin) {
      if (!emailPattern.test(email) || clearSpace(email) === "") {
        return toast(t("validation-incorrect-email"));
      }

      mutateUserLoginByEmailAsync({
        email: clearSpace(email),
        password: "fakePassword",
        md5_password: getMd5Password(password),
      }).then((data) => {
        handleLoginResponse(data);
      });
    } else {
      if (clearSpace(countryCode) === "") {
        return toast(t("validation-none-countrycode"));
      }

      if (!Number(clearSpace(phone))) {
        return toast(t("validation-incorrect-phone"));
      }

      mutateUserLoginByPhoneAsync({
        countrycode: +clearSpace(countryCode) || 86,
        phone: clearSpace(phone),
        password: "fakePassword",
        md5_password: getMd5Password(password),
      }).then((data) => {
        handleLoginResponse(data);
      });
    }
  };

  const handleLoginResponse = (data: MutateUserLoginResponse) => {
    const { code, msg, token, cookie } = data;
    if (code !== 200) {
      toast(msg || t("account-password-incorrect"));
      dispatch(setUser(null));
      dispatch(setToken(""));
      dispatch(setLoginMode(""));
    } else {
      setCookies(cookie);
      setAuthCookie(getAuthCookie());
      dispatch(setToken(token));
    }
  };

  const { data } = useUserProfile(authCookie);

  useEffect(() => {
    if (data?.code === 200 && !data?.profile) {
      toast(t("unbound-account"));
      return;
    } else if (data?.profile) {
      dispatch(setUser(data.profile));
      dispatch(setLoginMode("account"));

      router.replace("/zone");
    }
  }, [data]);

  return (
    <Container>
      <TitleBoardContainer>
        <TitleBoard
          title={t("login-ncloud-music-title")}
          info={t("login-ncloud-music-caption")}
        />
      </TitleBoardContainer>

      <FormContainer>
        <IconNCloudLogo />
        <Title bold>{t("ncloud-music")}</Title>

        {isEmailLogin ? (
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            width={270}
            icon={<IconEmail />}
            placeholder={"Email"}
          />
        ) : (
          <>
            <Input
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              width={270}
              icon={<IconEarth />}
              placeholder={"Country Code"}
            />
            <div style={{ marginBottom: 12 }}></div>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              width={270}
              icon={<IconPhone />}
              placeholder={"Phone"}
            />
          </>
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

        <LoginButton onClick={handleLogin}>
          <LoginButtonText bold>{t("title")}</LoginButtonText>
        </LoginButton>

        <ChangeLoginType onClick={handleLoginTypeChange}>
          {isEmailLogin ? t("login-by-phone") : t("login-by-email")}
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
