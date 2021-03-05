import { AppProps } from "next/app";
import { GlobalStyles } from "twin.macro";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  );
};

export default App;
