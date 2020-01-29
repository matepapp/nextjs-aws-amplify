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
  email: string;
  code: string;
};

const ConfirmSignUp = () => {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();
  const { handleSubmit, register } = useForm<Form>();

  const onSubmit = handleSubmit(async ({ email, code }) => {
    try {
      setLoading(true);
      await Auth.confirmSignUp(email, code);
      toast({
        status: "success",
        title: "Confirm success!",
        description: "You can login with your credentials"
      });
    } catch (error) {
      toast({ status: "error", title: "Error", description: error.message });
    } finally {
      setLoading(false);
    }
  });

  return (
    <Box maxW="sm">
      <Heading my={4}>Confirm Sign Up</Heading>
      <form onSubmit={onSubmit}>
        <FormControl mt={3}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input type="email" name="email" ref={register} />
        </FormControl>
        <FormControl mt={3}>
          <FormLabel htmlFor="code">Code</FormLabel>
          <Input type="text" name="code" ref={register} />
        </FormControl>

        <Button type="submit" mt={6} isLoading={isLoading}>
          Confirm
        </Button>
      </form>
    </Box>
  );
};

export default ConfirmSignUp;
