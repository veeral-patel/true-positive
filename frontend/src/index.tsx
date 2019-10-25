import "antd/dist/antd.css";
import App from "App";
import { Provider } from "mobx-react";
import React from "react";
import ReactDOM from "react-dom";
import "react-quill/dist/quill.snow.css";
import store from "stores";
import * as serviceWorker from "./serviceWorker";

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
    authStore={store.authStore}
    indicatorStore={store.indicatorStore}
  >
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
