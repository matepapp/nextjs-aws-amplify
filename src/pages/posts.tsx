import { useQuery } from "@apollo/react-hooks";
import { Heading } from "@chakra-ui/core";
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

const PostsPage: NextPage = () => {
  const { data } = useQuery(QUERY);

  console.log(data);
  return <Heading>Posts</Heading>;
};

export default withApollo(PostsPage);
