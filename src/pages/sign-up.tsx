import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast
} from "@chakra-ui/core";
import { Auth } from "aws-amplify";
import { useState } from "react";
import { useForm } from "react-hook-form";

type Form = {
  name: string;
  email: string;
  password: string;
};

const SignUp = () => {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();
  const { handleSubmit, register } = useForm<Form>({
    defaultValues: {
      name: "",
      email: "",
      password: ""
    }
  });

  const onSubmit = handleSubmit(async ({ email, name, password }) => {
    try {
      setLoading(true);
      await Auth.signUp({ username: email, password, attributes: { name } });
      toast({
        status: "success",
        title: "Successful Sign Up",
        description: "Check your email inbox with for verification code"
      });
    } catch (error) {
      toast({ status: "error", title: "Error", description: error.message });
    } finally {
      setLoading(false);
    }
  });

  return (
    <Box maxW="sm">
      <Heading my={4}>Sign up</Heading>
      <form onSubmit={onSubmit}>
        <FormControl>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input name="name" ref={register} />
        </FormControl>
        <FormControl mt={3}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input type="email" name="email" ref={register} />
        </FormControl>
        <FormControl mt={3}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input type="password" name="password" ref={register} />
        </FormControl>

        <Button type="submit" mt={6} isLoading={isLoading}>
          Register
        </Button>
      </form>
    </Box>
  );
};

export default SignUp;
