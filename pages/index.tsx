import tw, { styled, css } from "twin.macro";
import TitleBoard from "../components/boards/title-board";
import CaptionBoard from "../components/boards/caption-board";
import { MediaCard } from "../components/cards";

const coverPath =
  "https://p2.music.126.net/2Ctl_VC8ZzxIiitZQFyy3A==/109951163966538110.jpg?param=512y512";

const movieCoverPath =
  "https://p1.music.126.net/c6y8xjSlDESdDuiELIAh4A==/5888984278505748.jpg?param=464y260";

const Home = () => {
  return (
    <Container>
      <TitleBoardContainer>
        <TitleBoard title="For you" info="三月八日，星期一" />
      </TitleBoardContainer>

      <CaptionBoard caption="推荐歌单" />

      <MediaCard
        cardType="album"
        coverPath={coverPath}
        title="减肥！跑步歌单（中文）减肥！跑步歌单（中文）"
        caption="根据你喜欢的单曲《爱你》推荐根据你喜欢的单曲《爱你》推荐根据你喜欢的单曲《爱你》推荐"
        playCount={860}
        isCanCaptionClick={false}
      />

      <br />

      <MediaCard
        cardType="movie"
        coverPath={movieCoverPath}
        title="干杯"
        caption="五月天"
        playCount={860}
      />
    </Container>
  );
};

export default Home;

const Container = styled.div``;

const TitleBoardContainer = tw.div`ml-10 mt-6`;
