import { AppProps } from "next/app";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { store } from "../store";
import { GlobalStyles } from "twin.macro";
import Layout from "../layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/css/rc-drawer.css";
import "rc-dialog/assets/index.css";
import 'plyr/dist/plyr.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 3 * 60 * 1000,
    },
  },
});

const persistor = persistStore(store);

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <GlobalStyles />
            <Component {...pageProps} />
          </Layout>
          <ToastContainer />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
