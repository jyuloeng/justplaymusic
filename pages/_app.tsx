import { AppProps } from "next/app";
import { GlobalStyles } from "twin.macro";
import Layout from "../layout";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Layout>
      <GlobalStyles />
      <Component {...pageProps} />
    </Layout>
  );
};

export default App;
