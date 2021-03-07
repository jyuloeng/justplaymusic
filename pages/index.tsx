import tw from "twin.macro";
import { Button, Logo } from "../components";

const App = () => (
  <div
    css={[
      tw`flex flex-col items-center justify-center h-screen`,
      // tw`bg-gradient-to-b from-electric to-ribbon`,
      // tw`bg-neutral-light dark:bg-neutral-dark`,
    ]}
  >
    <div tw="flex flex-col justify-center h-full gap-y-5">
      <Button isPrimary>Submit</Button>
      <Button isSecondary>Cancel</Button>
      <Button isSmall>Close</Button>
    </div>
    <Logo />
  </div>
  // <div>个性推荐</div>
);

export default App;
