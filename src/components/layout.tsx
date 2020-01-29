import { Box, Flex, Link as Anchor } from "@chakra-ui/core";
import Head from "next/head";
import Link from "next/link";
import { FC } from "react";

type Props = {
  title?: string;
};

const Layout: FC<Props> = ({
  children,
  title = "This is the default title"
}) => (
  <Flex direction="column">
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Box as="header" w="full" bg="teal.600" color="white">
      <Flex as="nav" direction="row">
        <Link href="/">
          <Anchor m={2}>Home</Anchor>
        </Link>
        <Link href="/about">
          <Anchor m={2}>About</Anchor>
        </Link>
        <Link href="/sign-up">
          <Anchor m={2}>Sign Up</Anchor>
        </Link>
      </Flex>
    </Box>
    <Box m={4}>{children}</Box>
    <footer>
      <hr />
      <span>I'm here to stay (Footer)</span>
    </footer>
  </Flex>
);

export default Layout;
