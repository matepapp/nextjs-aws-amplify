import { CSSReset, ThemeProvider } from "@chakra-ui/core";
import { AppProps } from "next/app";
import Layout from "../components/layout";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider>
      <CSSReset />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
};

export default App;
