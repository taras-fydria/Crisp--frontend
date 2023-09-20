import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: "http://localhost:10003/graphql",
  cache: new InMemoryCache(),
});