import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: "http://localhost:10013/graphql",
  cache: new InMemoryCache(),
});