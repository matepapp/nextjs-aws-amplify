import { useQuery } from "@apollo/react-hooks";
import { getDataFromTree } from "@apollo/react-ssr";
import { Flex, Heading, SimpleGrid, Text } from "@chakra-ui/core";
import gql from "graphql-tag";
import { NextPage } from "next";
import { withApollo } from "../lib/with-apollo";

const QUERY = gql`
  {
    episodes {
      results {
        id
        name
        air_date
        episode
      }
    }
  }
`;

const EpisodesPage: NextPage = () => {
  const { data } = useQuery(QUERY, {
    context: { clientName: "rickAndMorty" }
  });

  return (
    <>
      <Heading>Episodes</Heading>
      <Heading as="h2" fontSize="xl" color="gray.600" textTransform="uppercase">
        with serverless lambda function deploy λ
      </Heading>
      {data && (
        <SimpleGrid minChildWidth={300} spacing={10} mt={4}>
          {data.episodes.results.map(({ name, id, air_date, episode }: any) => (
            <Flex key={id} direction="column" shadow="lg" rounded="lg" p={4}>
              <Heading as="h2" fontSize="lg" color="teal.800">
                {episode}
              </Heading>
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
                {air_date}
              </Text>
            </Flex>
          ))}
        </SimpleGrid>
      )}
    </>
  );
};

export default withApollo(EpisodesPage, { getDataFromTree });
