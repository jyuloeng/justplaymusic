import { AppProps } from "next/app";
import { QueryClientProvider, QueryClient } from "react-query";
import { GlobalStyles } from "twin.macro";
import Layout from "../layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 3 * 60 * 1000,
    },
  },
});

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <GlobalStyles />
        <Component {...pageProps} />
      </Layout>
      <ToastContainer />
    </QueryClientProvider>
  );
};

export default App;
