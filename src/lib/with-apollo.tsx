import { ApolloProvider } from "@apollo/react-hooks";
import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import { ApolloLink } from "apollo-link";
import { createHttpLink } from "apollo-link-http";
import { Auth } from "aws-amplify";
import { createAuthLink } from "aws-appsync-auth-link";
import { createSubscriptionHandshakeLink } from "aws-appsync-subscription-link";
import withApolloHOC from "next-with-apollo";
import AWSConfig from "../aws-exports";

export const withApollo = withApolloHOC(
  ({ initialState }) => {
    const url = AWSConfig.aws_appsync_graphqlEndpoint;
    const region = AWSConfig.aws_appsync_region;
    const auth = {
      type: "AMAZON_COGNITO_USER_POOLS" as const,
      jwtToken: async () =>
        (await Auth.currentSession()).getIdToken().getJwtToken()
    };

    const rickAndMortyLink = createHttpLink({
      uri: "https://rickandmortyapi.com/graphql"
    });

    const appSyncLink = ApolloLink.from([
      createAuthLink({ url, region, auth }),
      createSubscriptionHandshakeLink({ url, region, auth })
    ]);

    return new ApolloClient({
      link: ApolloLink.split(
        operation => operation.getContext().clientName === "rickAndMorty",
        rickAndMortyLink,
        appSyncLink
      ),
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
