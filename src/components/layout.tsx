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
      <Flex as="nav" direction="row" p={2}>
        <Box flex="1">
          <Link href="/">
            <Anchor mx={2}>Home</Anchor>
          </Link>
          <Link href="/about">
            <Anchor mx={2}>About</Anchor>
          </Link>
        </Box>
        <Box>
          <Link href="/login">
            <Anchor mx={2}>Login</Anchor>
          </Link>
          <Link href="/sign-up">
            <Anchor mx={2}>Sign Up</Anchor>
          </Link>
          <Link href="/confirm-sign-up">
            <Anchor mx={2}>Confirm Sign Up</Anchor>
          </Link>
        </Box>
      </Flex>
    </Box>
    <Box m={4} bg="grey.100">
      {children}
    </Box>
  </Flex>
);

export default Layout;
