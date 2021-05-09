import { useState, useEffect, useRef } from "react";
import tw, { styled, css } from "twin.macro";
import { useRouter } from "next/router";
import Plyr from "plyr";
import { useMVorVideoDetail, useMVorVideoUrl } from "../../hooks";
import { useAppSelector } from "./../../store/index";
import { selectVolume } from "../../store/slice/song.slice";
import { tuple } from "./../../lib/type";
import {
  InfoText,
  IntroText,
  MainText,
  MediumText,
  SmallText,
} from "./../../styles/typography/index";
import { formatDate } from "../../lib/format";
import { Avatar } from "../../components/commons";
import { IconHeart } from "../../styles/icons";
import { Primary2Color } from "./../../styles/colors/index";

export interface MVIdProps {}

const PlayInfoTypes = tuple("mv", "video");
type PlayInfoType = typeof PlayInfoTypes[number];

interface PlayInfo {
  type?: PlayInfoType;
  id?: string | number;
  title?: string;
  description?: string;
  publishTime?: string;
  artist?: {
    id?: number;
    name?: string;
  };
  creator?: {
    nickname?: string;
    avatarUrl?: string;
  };
  coverPath?: string;
  playCount?: number;
}

const baseIconSize = {
  width: 24,
  height: 24,
};

const MVId: React.FC<MVIdProps> = () => {
  const router = useRouter();

  const volume = useAppSelector(selectVolume);

  const playerRef = useRef<HTMLVideoElement>(null);
  const [id, setId] = useState("");
  const [r, setR] = useState(480);
  const [playerInfo, setPlayerInfo] = useState<PlayInfo>(null);
  const [player, setPlayer] = useState(null);

  const { mvInfo, videoInfo } = useMVorVideoDetail(router.query.id as string);
  const { url } = useMVorVideoUrl({ id: playerInfo?.id, r });

  useEffect(() => {
    if (mvInfo) {
      const { id, name, publishTime, artistId, artistName, playCount } = mvInfo;
      setPlayerInfo({
        type: "mv",
        id,
        title: name,
        description: mvInfo.desc,
        publishTime: formatDate(publishTime),
        artist: {
          id: artistId,
          name: artistName,
        },
        coverPath: mvInfo.cover,
        playCount: playCount,
      });
    } else if (videoInfo) {
      const { title, description, publishTime, creator, playTime } = videoInfo;
      setPlayerInfo({
        type: "video",
        id: videoInfo.vid,
        title,
        description,
        publishTime: formatDate(publishTime),
        creator: { nickname: creator.nickname, avatarUrl: creator.avatarUrl },
        coverPath: videoInfo.coverUrl,
        playCount: playTime,
      });
    }
    console.log(mvInfo);
    console.log(videoInfo);
  }, [mvInfo, videoInfo]);

  useEffect(() => {
    if (url) {
      let playerOptions = {
        quality: {
          default: 480,
          options: [1080, 720, 480, 240],
        },
        volume,
      };
      console.log(`mv url is ${url}`);

      // playerRef.current.volume = volume;
      setPlayer(new Plyr(playerRef.current, playerOptions));
    }

    return () => {
      setPlayer(null);
    };
  }, [url]);

  useEffect(() => {
    if (player) {
      let sources = [];
      let sizes = [240, 480, 720];

      // for (let i = 0; i < 3; i++) {
      //   sources.push({
      //     src:
      //       "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/wgCbuRLG_154557790_shd.mp4?ts=1618146549&rid=20A39D147409D5D6B6E1E5DFDF100EF3&rl=3&rs=EaRqDrjXZdLuGAuQAWysBAQjpXukVYrD&sign=ba6deb9eead47174bcbef482952b189f&ext=nKtWu12k5Xv0IrVNxGs4VU0IIwhMwk%2FXe9nZUOpigVp%2FlXWdFQLSO7Ap9qSY0k%2BWSWdUxvuZJNdK%2FBiMuIDDrDQaaq4VCl%2BUPTvutxns3jkN3giJZ6lBuHfmtM7eZPmS5JwK8bYsuA1RnWR1%2BLTkGaVbUhwhf3BhKhMfmN8PW%2FVATZnre1jcPNYJcBiPpJS7%2FhMkJUcY%2B7Dr%2FWIen3rsRNkqLE32Xj07n5ihQi7g3kZT26u2y5vC5%2FpulcbKWzF9",
      //     type: "video/mp4",
      //     size: sizes[i],
      //   });
      // }

      // player.source = {
      //   type: "video",
      //   title: "this.mv.data.name",
      //   sources: sources,
      //   poster: mvInfo?.cover,
      // };
    }
  }, [player]);

  return (
    <Container>
      <PlayerContainer>
        <Player ref={playerRef} src={url}></Player>
      </PlayerContainer>

      <Info>
        <Title>
          <Name bold>{playerInfo?.title}</Name>

          <Icon>
            <IconHeart {...baseIconSize} fill={Primary2Color} />
          </Icon>
        </Title>
        <Meta>
          {playerInfo?.type === "mv" && (
            <Artist
              bold
              onClick={() => router.push(`/artist/${playerInfo?.artist?.id}`)}
            >
              {playerInfo?.artist?.name}
            </Artist>
          )}
          {playerInfo?.type === "video" && (
            <Creator>
              <AvatarContainer>
                <Avatar src={playerInfo?.creator?.avatarUrl} />
              </AvatarContainer>
              <Nickname>{playerInfo?.creator.nickname}</Nickname>
            </Creator>
          )}
          <PublishTime>{playerInfo?.publishTime}</PublishTime>
          <PlayCount>播放数：{playerInfo?.playCount}</PlayCount>
        </Meta>
        <DescriptionContainer>
          <Description>{playerInfo?.description}</Description>
        </DescriptionContainer>
      </Info>
    </Container>
  );
};

export default MVId;

const PublishTime = styled(InfoText)(() => [tw``]);

const PlayCount = styled(InfoText)(() => [tw``]);

const Description = styled(SmallText)(() => [
  tw`cursor-pointer hover:underline`,
  css`
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (min-width: 1024px) {
      -webkit-line-clamp: 3;
    }
  `,
]);

const DescriptionContainer = styled.div(() => [tw`mt-3 md:mt-4`]);

const Nickname = styled(InfoText)(() => [tw``]);

const AvatarContainer = styled.div(() => [tw`w-6 md:w-7`]);

const Creator = styled.div(() => [
  tw`grid items-center gap-1 md:gap-2`,
  css`
    grid-template-columns: repeat(2, minmax(0, max-content));
  `,
]);

const Artist = styled(InfoText)(() => [tw`cursor-pointer hover:underline`]);

const Meta = styled.div(() => [
  tw`grid gap-2 md:gap-3 items-center mt-2 md:mt-3`,
  css`
    grid-template-columns: repeat(3, minmax(0, max-content));
  `,
]);

const Icon = styled.div(() => [
  tw`self-start p-1 cursor-pointer transition`,
  css`
    &:active {
      transform: scale(0.92);
    }
  `,
]);

const Name = styled(IntroText)(() => [tw``]);

const Title = styled.div(() => [tw`flex justify-between items-center`]);

const Info = styled.div(() => [tw`p-2 md:p-0`]);

const Player = styled.video(() => [tw``]);

const PlayerContainer = styled.div(() => [
  tw`md:mb-4 md:my-10 md:rounded-2xl overflow-hidden`,
  css``,
]);

const Container = styled.div(() => [tw`pb-4 md:pb-12`]);
