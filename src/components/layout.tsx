import { Box, Button, Flex, Link as Anchor, Text } from "@chakra-ui/core";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import { useAmplifyAuth } from "../lib/hooks/use-amplify-auth";

type Props = {
  title?: string;
};

const NavLink = ({ to, label }: { to: string; label: string }) => {
  const router = useRouter();

  return (
    <Link href={to}>
      <Anchor
        mx={1}
        p={2}
        rounded="md"
        bg={router.pathname === to ? "teal.800" : "none"}
        fontWeight="semibold"
        _hover={{ bg: "teal.700" }}
      >
        {label}
      </Anchor>
    </Link>
  );
};

const Layout: FC<Props> = ({
  children,
  title = "This is the default title"
}) => {
  const { isLoggedIn, authenticatedUser, signOut } = useAmplifyAuth();

  return (
    <Flex direction="column">
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Box as="header" w="full" bg="teal.600" color="white">
        <Flex as="nav" direction="row" p={3} wrap="wrap" align="center">
          <Box flex="1">
            <NavLink to="/" label="Home" />
            <NavLink to="/episodes" label="Episodes λ" />
            <NavLink to="/characters" label="Characters ⚡️" />
            {isLoggedIn && <NavLink to="/blogs" label="Blogs 🔶" />}
          </Box>
          <Flex align="center">
            {!isLoggedIn && <NavLink to="/login" label="Login" />}
            {!isLoggedIn && <NavLink to="/sign-up" label="Sign Up" />}
            {!isLoggedIn && (
              <NavLink to="/confirm-sign-up" label="Confirm Sign Up" />
            )}
            {isLoggedIn && (
              <Button
                size="sm"
                variantColor="teal"
                mr={3}
                onClick={() => signOut()}
              >
                Sign Out
              </Button>
            )}
            {authenticatedUser && (
              <Flex direction="column" align="flex-end">
                <Text fontSize="sm" fontWeight="bold" textTransform="uppercase">
                  {authenticatedUser.name}
                </Text>
                <Text fontSize="xs">{authenticatedUser.email}</Text>
              </Flex>
            )}
          </Flex>
        </Flex>
      </Box>
      <Box m={4} bg="grey.100">
        {children}
      </Box>
    </Flex>
  );
};

export default Layout;
