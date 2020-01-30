import { useQuery, useSubscription } from "@apollo/react-hooks";
import {
  Box,
  Flex,
  Heading,
  SimpleGrid,
  Spinner,
  Stack,
  Text
} from "@chakra-ui/core";
import gql from "graphql-tag";
import { NextPage } from "next";
import { useEffect, useState } from "react";
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

const SUBSCRIPTION = gql`
  subscription {
    onCreateBlog {
      name
    }
  }
`;

const NewBlog = () => {
  const [newBlogs, setNewBlogs] = useState<string[]>([]);
  const { data } = useSubscription(SUBSCRIPTION);

  useEffect(() => {
    if (data) {
      setNewBlogs(prevBlogs => [...prevBlogs, data.onCreateBlog.name]);
    }
  }, [data, setNewBlogs]);

  return (
    <>
      <Heading mt={5} fontSize="xl">
        Live Blog 🔥
      </Heading>
      <Stack spacing={10} m={4}>
        {newBlogs.map((blogName, index) => (
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
        <SimpleGrid minChildWidth={200} spacing={10} mt={4}>
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
    </>
  );
};

export default withApollo(BlogsPage);
