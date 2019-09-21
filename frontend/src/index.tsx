import "antd/dist/antd.css";
import App from "App";
import { Provider } from "mobx-react";
import { RootStore, StoreContext } from "models";
import { createHttpClient } from "mst-gql";
import React from "react";
import ReactDOM from "react-dom";
import "react-quill/dist/quill.snow.css";
import store from "stores";
import * as serviceWorker from "./serviceWorker";

const gqlHttpClient = createHttpClient(
  `${process.env.REACT_APP_API_ENDPOINT}/graphql`
);

const rootStore = RootStore.create(undefined, {
  gqlHttpClient
});

ReactDOM.render(
  <Provider
    allCasesStore={store.allCasesStore}
    activeCaseStore={store.activeCaseStore}
    uiStore={store.uiStore}
    statusStore={store.statusStore}
    priorityStore={store.priorityStore}
    userStore={store.userStore}
    tagStore={store.tagStore}
    allTasksStore={store.allTasksStore}
  >
    <StoreContext.Provider value={rootStore}>
      <App />
    </StoreContext.Provider>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
