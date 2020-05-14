import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient, { DefaultOptions } from "apollo-client";
import { setContext } from "apollo-link-context";
import { HttpLink } from "apollo-link-http";
import store from "stores";
import { getApiEndpoint } from "utils/getApiEndpoint";

const cache = new InMemoryCache();

const defaultOptions: DefaultOptions = {
  query: {
    fetchPolicy: "network-only"
  }
};

const httpLink = new HttpLink({
  uri: `${getApiEndpoint()}/graphql`
});

const authLink = setContext((_, { headers }) => {
  const token = store.authStore.getToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  defaultOptions
});

export default client;
