import { CSSReset, ThemeProvider } from "@chakra-ui/core";
import Amplify from "aws-amplify";
import { AppProps } from "next/app";
import config from "../aws-exports";
import Layout from "../components/layout";

Amplify.configure(config);

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
