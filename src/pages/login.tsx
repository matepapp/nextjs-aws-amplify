import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input
} from "@chakra-ui/core";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAmplifyAuth } from "../lib/hooks/use-amplify-auth";

type Form = {
  email: string;
  password: string;
};

const Login = () => {
  const [isLoading, setLoading] = useState(false);
  const { signIn } = useAmplifyAuth();

  const { handleSubmit, register } = useForm<Form>({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = handleSubmit(async ({ email, password }) => {
    try {
      setLoading(true);
      await signIn({ email, password });
    } finally {
      setLoading(false);
    }
  });

  return (
    <Box maxW="sm">
      <Heading my={4}>Login</Heading>
      <form onSubmit={onSubmit}>
        <FormControl mt={3}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input type="email" name="email" ref={register} />
        </FormControl>
        <FormControl mt={3}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input type="password" name="password" ref={register} />
        </FormControl>

        <Button type="submit" mt={6} isLoading={isLoading}>
          Sign In
        </Button>
      </form>
    </Box>
  );
};

export default Login;
