import tw, { styled, css } from "twin.macro";
import { Player } from "../components/controls";
import { useAppSelector } from "../store/index";
import { selectCurrentSong, selectSonglist } from "../store/slice/song.slice";

export interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  const currentSong = useAppSelector(selectCurrentSong);
  const songlistInfo = useAppSelector(selectSonglist);

  return <Container>{currentSong?.id && songlistInfo && <Player />}</Container>;
};

export default Footer;

const Container = styled.footer(() => [
  tw`fixed bottom-0 w-full
  bg-neutral-light dark:bg-neutral-dark`,
  css`
    z-index: 10000;
  `,
]);
