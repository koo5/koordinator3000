import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { WebSocketLink } from "apollo-link-ws";
import { split } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { getMainDefinition } from "apollo-utilities";
import fetch from 'node-fetch';


const headers = {'content-type': 'application/json'};

const getHeaders = () => {
  return headers;
};

const cache = new InMemoryCache();

const wsLink = process.browser ? new WebSocketLink({
  uri: "ws://koordinator2.hasura.app/v1/graphql",
  options: {
    reconnect: true,
    lazy: true,
    connectionParams: () => {
      return { headers: getHeaders() };
    },
  },
}) : null;

const httpLink = new HttpLink({
  uri: "https://koordinator2.hasura.app/v1/graphql",
  headers: getHeaders(),
  fetch:fetch,

});

const link = process.browser ? split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && (operation === "subscription" || operation === "mutation");
  },
  wsLink,
  httpLink
) : httpLink;

export const client = new ApolloClient({
  ssrMode: true,
  link,
  cache
});

