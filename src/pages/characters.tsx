import { useQuery } from "@apollo/react-hooks";
import {
  Avatar,
  Flex,
  Heading,
  SimpleGrid,
  Spinner,
  Text
} from "@chakra-ui/core";
import gql from "graphql-tag";
import { NextPage } from "next";
import withApollo from "../lib/with-apollo";

const QUERY = gql`
  {
    characters {
      results {
        id
        name
        image
        gender
      }
    }
  }
`;

const CharactersPage: NextPage = () => {
  const { data, loading } = useQuery(QUERY);

  return (
    <>
      <Heading>Characters</Heading>
      <Heading as="h2" fontSize="xl" color="gray.600" textTransform="uppercase">
        with automatic static optimization ⚡️
      </Heading>
      {loading && <Spinner size="lg" m={4} />}
      {data && (
        <SimpleGrid minChildWidth="240px" spacing={10} mt={4}>
          {data.characters.results.map(({ name, id, gender, image }: any) => (
            <Flex key={id} dir="row" shadow="lg" rounded="lg" p={4}>
              <Avatar size="lg" src={image} />
              <Flex direction="column" justify="center" ml={3}>
                <Heading as="h3" fontSize="md">
                  {name}
                </Heading>
                <Text
                  fontWeight="bold"
                  fontSize="sm"
                  color="gray.600"
                  textTransform="uppercase"
                >
                  {gender}
                </Text>
              </Flex>
            </Flex>
          ))}
        </SimpleGrid>
      )}
    </>
  );
};

export default withApollo(CharactersPage);
