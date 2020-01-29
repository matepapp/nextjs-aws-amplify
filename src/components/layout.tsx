import { Box, Flex, Link as Anchor } from "@chakra-ui/core";
import Head from "next/head";
import Link from "next/link";
import { FC } from "react";

type Props = {
  title?: string;
};

const NavLink = ({ to, label }: { to: string; label: string }) => (
  <Link href={to}>
    <Anchor
      mx={1}
      p={2}
      rounded="md"
      _hover={{ bg: "teal.700" }}
      fontWeight="semibold"
    >
      {label}
    </Anchor>
  </Link>
);

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
      <Flex as="nav" direction="row" p={3} wrap="wrap">
        <Box flex="1">
          <NavLink to="/" label="Home" />
          <NavLink to="/episodes" label="Episodes λ" />
          <NavLink to="/characters" label="Characters ⚡️" />
          <NavLink to="/posts" label="Posts 🔶" />
        </Box>
        <Box>
          <NavLink to="/login" label="Login" />
          <NavLink to="/sign-up" label="Sign Up" />
          <NavLink to="/confirm-sign-up" label="Confirm Sign Up" />
        </Box>
      </Flex>
    </Box>
    <Box m={4} bg="grey.100">
      {children}
    </Box>
  </Flex>
);

export default Layout;
