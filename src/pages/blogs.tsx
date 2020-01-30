import { useQuery } from "@apollo/react-hooks";
import { Box, Flex, Heading, SimpleGrid, Spinner, Text } from "@chakra-ui/core";
import gql from "graphql-tag";
import { NextPage } from "next";
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
    </>
  );
};

export default withApollo(BlogsPage);
