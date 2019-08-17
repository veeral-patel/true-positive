import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "antd/dist/antd.css";
import * as serviceWorker from "./serviceWorker";
import { ApolloProvider } from "react-apollo-hooks";
import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: `${process.env.REACT_APP_API_ENDPOINT}/graphql`
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
