import { notification } from "antd";
import { ApolloError, ApolloQueryResult } from "apollo-boost";
import client from "createApolloClient";
import { action, observable, runInAction } from "mobx";
import GET_PRIORITIES from "queries/getPriorities";
import IPriority from "ts/interfaces/IPriority";

interface IPriorityData {
  priorities: IPriority[];
}

class PriorityStore {
  @observable priorities: IPriority[] = [];
  @observable prioritiesAreLoading: boolean = false;

  @action.bound
  loadPriorities() {
    this.prioritiesAreLoading = true;
    client
      .query<IPriorityData>({
        query: GET_PRIORITIES
      })
      .then((response: ApolloQueryResult<IPriorityData>) =>
        runInAction(() => (this.priorities = response.data.priorities))
      )
      .catch((error: ApolloError) => {
        notification.error({
          message: "An error occurred while fetching priorities",
          description: error.message
        });
        runInAction(() => (this.priorities = []));
      })
      .finally(() => runInAction(() => (this.prioritiesAreLoading = false)));
  }
}

export default PriorityStore;
