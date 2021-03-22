import { useState } from "react";
import tw, { styled, css } from "twin.macro";
import useTranslation from "next-translate/useTranslation";
import { TitleBoard } from "../../components/boards";
import { Select, Switch } from "../../components/forms";
import { Button } from "../../components/buttons";
import { MediumText, CaptionText, SmallText } from "../../styles/typography";
import { IconGithub } from "../../styles/icons";
import { setLanguage } from "../../lib/util";

export interface SettingsProps {}

const version = process.env.NEXT_PUBLIC_VERSION;

const Settings: React.FC<SettingsProps> = () => {
  const { t, lang } = useTranslation("settings");

  const langOptions = [
    {
      value: "zh",
      title: "简体中文",
    },
    {
      value: "en",
      title: "English",
    },
  ];

  const styleOptions = [
    {
      value: "auto",
      title: t("style-option-auto"),
    },
    {
      value: "light",
      title: t("style-option-light"),
    },
    {
      value: "dark",
      title: t("style-option-dark"),
    },
  ];

  const qualityOptions = [
    {
      value: "128",
      title: t("quality-option-128"),
    },
    {
      value: "192",
      title: t("quality-option-192"),
    },
    {
      value: "320",
      title: t("quality-option-320"),
    },
    {
      value: "flac",
      title: t("quality-option-flac"),
    },
  ];

  const lyricsBgOptions = [
    {
      value: "auto",
      title: t("lyrics-bg-option-auto"),
    },
    {
      value: "blur",
      title: t("lyrics-bg-option-blur"),
    },
  ];

  const lyricsSizeOptions = [
    {
      value: 17,
      title: t("lyrics-size-option-small"),
    },
    {
      value: 20,
      title: t("lyrics-size-option-medium"),
    },
    {
      value: 24,
      title: t("lyrics-size-option-large"),
    },
    {
      value: 30,
      title: t("lyrics-size-option-oversize"),
    },
  ];

  const [checked, setChecked] = useState(false);

  const handleChangeLang = async () => {
    console.log(lang);
    await setLanguage(lang === "en" ? "zh" : "en");
  };

  return (
    <Container>
      <TitleBoardContainer>
        <TitleBoard title={t("title")} info={t("subtitle")} />
      </TitleBoardContainer>

      <SettingItems>
        <SettingItem>
          <MediumText bold>{t("language")}</MediumText>
          <Select options={langOptions} />
        </SettingItem>

        <SettingItem>
          <MediumText bold>{t("style")}</MediumText>
          <Select options={styleOptions} />
        </SettingItem>

        <SettingItem>
          <MediumText bold>{t("quality")}</MediumText>
          <Select options={qualityOptions} />
        </SettingItem>

        <SettingItem>
          <MediumText bold>{t("lyrics-translation")}</MediumText>
          <Switch
            checked={checked}
            onChange={() => setChecked((value) => !value)}
          />
        </SettingItem>

        <SettingItem>
          <MediumText bold>{t("lyrics-background")}</MediumText>
          <Select options={lyricsBgOptions} />
        </SettingItem>

        <SettingItem>
          <MediumText bold>{t("lyrics-size")}</MediumText>
          <Select options={lyricsSizeOptions} />
        </SettingItem>

        <SettingItem>
          <MediumText bold>{t("auto-cache")}</MediumText>
          <Switch
            checked={checked}
            onChange={() => setChecked((value) => !value)}
          />
        </SettingItem>

        <SettingItem>
          <MediumText bold>
            {t("songs-cached", { songs: 0, bytes: 0 })}
          </MediumText>
          <Button
            isShowBackground
            paddingY={2}
            onClick={() => handleChangeLang()}
          >
            <SmallText>{t("clear-cache")}</SmallText>
          </Button>
        </SettingItem>
      </SettingItems>

      <Info>
        <AuthorInfo
          href="https://github.com/oddii/justplaymuisc"
          target="_blank"
        >
          <IconGithub />
          <CaptionText bold>By odd</CaptionText>
        </AuthorInfo>
        <VersionInfo>
          <SmallText>version:&nbsp;&nbsp;{version}</SmallText>
        </VersionInfo>
      </Info>
    </Container>
  );
};

export default Settings;

const VersionInfo = styled.div(() => [tw`mt-1`]);

const AuthorInfo = styled.a(() => [tw`flex justify-between items-center`]);

const Info = styled.div(() => [
  tw`mx-auto text-center`,
  css`
    width: 90px;
  `,
]);

const SettingItem = styled.div(() => [tw`flex justify-between items-center`]);

const SettingItems = styled.div(() => [
  tw`grid gap-5 md:gap-6 mx-5 md:mx-auto my-10 lg:my-20`,
  css`
    @media (min-width: 768px) {
      width: 568px;
    }
  `,
]);

const TitleBoardContainer = styled.div(() => [tw`mx-5 lg:mx-10 mt-4 lg:mt-6`]);

const Container = styled.div(() => tw``);
