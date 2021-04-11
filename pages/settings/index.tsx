import { useState } from "react";
import tw, { styled, css } from "twin.macro";
import useTranslation from "next-translate/useTranslation";
import { TitleBoard } from "../../components/boards";
import { Select, Switch } from "../../components/forms";
import { Button } from "../../components/buttons";
import { MediumText, CaptionText, SmallText } from "../../styles/typography";
import { IconGithub } from "../../styles/icons";
import { setLanguageByUtil } from "../../lib/util";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  LanguageType,
  StyleType,
  QualityType,
  LyricsBackgroundType,
  LyricsSizeType,
  setLanguage,
  setAutoCacheSong,
  setLyricsBackground,
  setLyricsSize,
  setLyricsTranslation,
  setQuality,
  setStyle,
  selectLanguage,
  selectAutoCacheSong,
  selectLyricsBackground,
  selectLyricsSize,
  selectLyricsTranslation,
  selectQuality,
  selectStyle,
} from "../../store/slice/settings.slice";

export interface SettingsProps {}

const version = process.env.NEXT_PUBLIC_VERSION;

const Settings: React.FC<SettingsProps> = () => {
  const { t, lang } = useTranslation("settings");
  const dispatch = useAppDispatch();
  const language = useAppSelector(selectLanguage);
  const style = useAppSelector(selectStyle);
  const quality = useAppSelector(selectQuality);
  const lyricsTranslation = useAppSelector(selectLyricsTranslation);
  const lyricsBackground = useAppSelector(selectLyricsBackground);
  const lyricsSize = useAppSelector(selectLyricsSize);
  const autoCacheSong = useAppSelector(selectAutoCacheSong);

  const langOptions: Array<{
    value: LanguageType;
    title: string;
  }> = [
    {
      value: "zh",
      title: "简体中文",
    },
    {
      value: "en",
      title: "English",
    },
  ];

  const styleOptions: Array<{
    value: StyleType;
    title: string;
  }> = [
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

  const qualityOptions: Array<{
    value: QualityType;
    title: string;
  }> = [
    {
      value: 128000,
      title: t("quality-option-128"),
    },
    {
      value: 192000,
      title: t("quality-option-192"),
    },
    {
      value: 320000,
      title: t("quality-option-320"),
    },
    {
      value: 999000,
      title: t("quality-option-flac"),
    },
  ];

  const lyricsBgOptions: Array<{
    value: LyricsBackgroundType;
    title: string;
  }> = [
    {
      value: "auto",
      title: t("lyrics-bg-option-auto"),
    },
    {
      value: "blur",
      title: t("lyrics-bg-option-blur"),
    },
  ];

  const lyricsSizeOptions: Array<{
    value: LyricsSizeType;
    title: string;
  }> = [
    {
      value: 13,
      title: t("lyrics-size-option-small"),
    },
    {
      value: 17,
      title: t("lyrics-size-option-medium"),
    },
    {
      value: 20,
      title: t("lyrics-size-option-large"),
    },
    {
      value: 24,
      title: t("lyrics-size-option-oversize"),
    },
  ];

  const handleChangeLang = async (value: LanguageType) => {
    dispatch(setLanguage(value));
    await setLanguageByUtil(value);
  };

  return (
    <Container>
      <TitleBoardContainer>
        <TitleBoard title={t("title")} info={t("subtitle")} />
      </TitleBoardContainer>

      <SettingItems>
        <SettingItem>
          <MediumText bold>{t("language")}</MediumText>
          <Select<LanguageType>
            options={langOptions}
            defaultValue={language}
            onChange={(option) => handleChangeLang(option.value)}
          />
        </SettingItem>

        <SettingItem>
          <MediumText bold>{t("style")}</MediumText>
          <Select<StyleType>
            options={styleOptions}
            defaultValue={style}
            onChange={(option) => dispatch(setStyle(option.value))}
          />
        </SettingItem>

        <SettingItem>
          <MediumText bold>{t("quality")}</MediumText>
          <Select<QualityType>
            options={qualityOptions}
            defaultValue={quality}
            onChange={(option) => dispatch(setQuality(option.value))}
          />
        </SettingItem>

        <SettingItem>
          <MediumText bold>{t("lyrics-translation")}</MediumText>
          <Switch
            checked={lyricsTranslation}
            onChange={() => dispatch(setLyricsTranslation(!lyricsTranslation))}
          />
        </SettingItem>

        <SettingItem>
          <MediumText bold>{t("lyrics-background")}</MediumText>
          <Select<LyricsBackgroundType>
            options={lyricsBgOptions}
            defaultValue={lyricsBackground}
            onChange={(option) => dispatch(setLyricsBackground(option.value))}
          />
        </SettingItem>

        <SettingItem>
          <MediumText bold>{t("lyrics-size")}</MediumText>
          <Select<LyricsSizeType>
            options={lyricsSizeOptions}
            defaultValue={lyricsSize}
            onChange={(option) => dispatch(setLyricsSize(option.value))}
          />
        </SettingItem>

        <SettingItem>
          <MediumText bold>{t("auto-cache")}</MediumText>
          <Switch
            checked={autoCacheSong}
            onChange={() => dispatch(setAutoCacheSong(!autoCacheSong))}
          />
        </SettingItem>

        <SettingItem>
          <MediumText bold>
            {t("songs-cached", { songs: 0, bytes: 0 })}
          </MediumText>
          <Button isShowBackground paddingY={2}>
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
