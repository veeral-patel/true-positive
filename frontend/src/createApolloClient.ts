import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient, { DefaultOptions } from "apollo-client";
import { HttpLink } from "apollo-link-http";

const link = new HttpLink({
  uri: `${process.env.REACT_APP_API_ENDPOINT}/graphql`
});

const cache = new InMemoryCache();

const defaultOptions: DefaultOptions = {
  query: {
    fetchPolicy: "network-only"
  }
};

const client = new ApolloClient({
  link,
  cache,
  defaultOptions
});

export default client;
