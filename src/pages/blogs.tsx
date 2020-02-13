import { useMutation, useQuery, useSubscription } from "@apollo/react-hooks";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
  useToast
} from "@chakra-ui/core";
import gql from "graphql-tag";
import nanoid from "nanoid";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { withApollo } from "../lib/with-apollo";

const QUERY = gql`
  {
    listBlogs {
      items {
        id
        name
        posts {
          items {
            id
            title
          }
        }
      }
    }
  }
`;

const MUTATION = gql`
  mutation CreateBlog($id: ID!, $name: String!) {
    createBlog(input: { id: $id, name: $name }) {
      id
      name
    }
  }
`;

const SUBSCRIPTION = gql`
  subscription {
    onCreateBlog {
      id
      name
    }
  }
`;

const NewBlog = () => {
  const [createBlog, { loading }] = useMutation(MUTATION);
  const { handleSubmit, register } = useForm();
  const toast = useToast();

  const onSubmit = handleSubmit(async ({ name }) => {
    try {
      const id = nanoid();
      console.log({ id, name });
      await createBlog({ variables: { id, name } });
      toast({ status: "success", title: "New blog created" });
    } catch (error) {
      toast({ status: "error", title: "Error", description: error.message });
    }
  });

  return (
    <>
      <Heading mt={4} fontSize="xl">
        New Blog
      </Heading>
      <form onSubmit={onSubmit}>
        <FormControl mt={2} maxW="md">
          <FormLabel htmlFor="name">Blog name</FormLabel>
          <Input type="text" name="name" ref={register} />
        </FormControl>

        <Button type="submit" mt={4} isLoading={loading}>
          Create Blog
        </Button>
      </form>
    </>
  );
};

const LiveBlog = () => {
  const [liveBlogs, setLiveBlogs] = useState<string[]>([]);
  const { data, error } = useSubscription(SUBSCRIPTION);

  console.log({ error });
  useEffect(() => {
    if (data) {
      setLiveBlogs(prevBlogs => [...prevBlogs, data.onCreateBlog.name]);
    }
  }, [data, setLiveBlogs]);

  return (
    <>
      <Heading mt={5} fontSize="xl">
        Live Blog 🔥
      </Heading>
      <Stack spacing={4} m={4}>
        {liveBlogs.map((blogName, index) => (
          <Box key={index} shadow="lg" rounded="lg" p={4}>
            <Heading as="h3" fontSize="xl" mt={1}>
              {blogName}
            </Heading>
          </Box>
        ))}
      </Stack>
    </>
  );
};

const BlogsPage: NextPage = () => {
  const { data, loading } = useQuery(QUERY);

  return (
    <>
      <Heading>Blogs</Heading>
      <Heading as="h2" fontSize="xl" color="gray.600" textTransform="uppercase">
        with data via the AppSync API
      </Heading>
      {loading && <Spinner size="lg" m={4} />}
      {data && (
        <SimpleGrid minChildWidth={250} spacing={10} mt={4}>
          {data.listBlogs.items.map(({ name, id, posts }: any) => (
            <Flex key={id} direction="column" shadow="lg" rounded="lg" p={4}>
              <Heading as="h3" fontSize="xl" mt={1}>
                {name}
              </Heading>
              <Text
                mt={2}
                fontWeight="bold"
                fontSize="sm"
                color="gray.500"
                textTransform="uppercase"
              >
                {`${posts.items.length} number of posts`}
              </Text>
              {posts.items.map(({ id, title }: any) => (
                <Box key={id} ml={2}>
                  {title}
                </Box>
              ))}
            </Flex>
          ))}
        </SimpleGrid>
      )}

      <NewBlog />
      <LiveBlog />
    </>
  );
};

export default withApollo(BlogsPage);
