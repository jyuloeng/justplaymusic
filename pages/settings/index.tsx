import { useState } from "react";
import tw, { styled, css } from "twin.macro";
import { TitleBoard } from "../../components/boards";
import { Select, Switch } from "../../components/forms";
import { Button } from "../../components/buttons";
import { MediumText, CaptionText, SmallText } from "../../styles/typography";
import { IconGithub } from "../../styles/icons";

export interface SettingsProps {}

const langOptions = [
  {
    value: "cn",
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
    title: "跟随系统",
  },
  {
    value: "light",
    title: "光亮模式",
  },
  {
    value: "dark",
    title: "暗黑模式",
  },
];

const qualityOptions = [
  {
    value: "128",
    title: "标准 - 128Kbps",
  },
  {
    value: "192",
    title: "较高 - 192Kbps",
  },
  {
    value: "320",
    title: "极高 - 320Kbps",
  },
  {
    value: "flac",
    title: "无损 - FLAC",
  },
];

const lyricsBgOptions = [
  {
    value: "auto",
    title: "跟随主题",
  },
  {
    value: "blur",
    title: "动态模糊",
  },
];

const lyricsSizeOptions = [
  {
    value: 17,
    title: "小",
  },
  {
    value: 20,
    title: "标准",
  },
  {
    value: 24,
    title: "大",
  },
  {
    value: 30,
    title: "超大",
  },
];

const version = process.env.NEXT_PUBLIC_VERSION;

const Settings: React.FC<SettingsProps> = () => {
  const [checked, setChecked] = useState(false);

  return (
    <Container>
      <TitleBoardContainer>
        <TitleBoard title="设置" info="尝试自定义下你喜欢内容呗~" />
      </TitleBoardContainer>

      <SettingItems>
        <SettingItem>
          <MediumText bold>语言</MediumText>
          <Select options={langOptions} />
        </SettingItem>

        <SettingItem>
          <MediumText bold>主题</MediumText>
          <Select options={styleOptions} />
        </SettingItem>

        <SettingItem>
          <MediumText bold>音质选择</MediumText>
          <Select options={qualityOptions} />
        </SettingItem>

        <SettingItem>
          <MediumText bold>显示歌词翻译</MediumText>
          <Switch
            checked={checked}
            onChange={() => setChecked((value) => !value)}
          />
        </SettingItem>

        <SettingItem>
          <MediumText bold>歌词背景</MediumText>
          <Select options={lyricsBgOptions} />
        </SettingItem>

        <SettingItem>
          <MediumText bold>歌词字体大小</MediumText>
          <Select options={lyricsSizeOptions} />
        </SettingItem>

        <SettingItem>
          <MediumText bold>自动缓存歌曲</MediumText>
          <Switch
            checked={checked}
            onChange={() => setChecked((value) => !value)}
          />
        </SettingItem>

        <SettingItem>
          <MediumText bold>已缓存 0 首（0 字节）</MediumText>
          <Button isShowBackground paddingY={2}>
            <SmallText>清除歌曲缓存</SmallText>
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
