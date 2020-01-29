import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import withApollo from "next-with-apollo";

export default withApollo(
  ({ initialState }) => {
    return new ApolloClient({
      uri: "https://rickandmortyapi.com/graphql",
      cache: new InMemoryCache().restore(initialState || {})
    });
  },
  {
    render: ({ Page, props }) => {
      return (
        <ApolloProvider client={props.apollo}>
          <Page {...props} />
        </ApolloProvider>
      );
    }
  }
);
