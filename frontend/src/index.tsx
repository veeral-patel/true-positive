import "antd/dist/antd.css";
import App from "App";
import { Provider } from "mobx-react";
import React from "react";
import ReactDOM from "react-dom";
import "react-mde/lib/styles/css/react-mde-all.css";
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
    allTasksStore={store.allTasksStore}
    authStore={store.authStore}
    indicatorStore={store.indicatorStore}
  >
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
