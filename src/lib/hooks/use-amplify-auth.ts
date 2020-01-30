import { useToast } from "@chakra-ui/core";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAsync, useToggle } from "react-use";

type User = {
  name: string;
  email: string;
};

export const useAmplifyAuth = () => {
  const [authenticatedUser, setAuthenticatedUser] = useState<User | undefined>(
    undefined
  );
  const [isLoggedIn, setLoggedIn] = useToggle(false);
  const toast = useToast();
  const router = useRouter();

  const signOut = async () => {
    try {
      await Auth.signOut();
      setAuthenticatedUser(undefined);
      setLoggedIn(false);
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const signIn = async ({
    email,
    password
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const user = await Auth.signIn({ username: email, password });
      const { attributes } = user;
      setAuthenticatedUser({ name: attributes.name, email: attributes.email });
      setLoggedIn(true);
      toast({ status: "success", title: "Successful Login" });
      router.push("/blogs");
    } catch (error) {
      toast({ status: "error", title: "Error", description: error.message });
    }
  };

  useAsync(async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const {
        attributes: { name, email }
      } = user;
      setAuthenticatedUser({ name, email });
      setLoggedIn(true);
    } catch {}
  });

  return { isLoggedIn, authenticatedUser, signOut, signIn };
};
