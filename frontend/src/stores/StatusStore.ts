import { notification } from "antd";
import { ApolloError, ApolloQueryResult } from "apollo-boost";
import client from "createApolloClient";
import { action, observable, runInAction } from "mobx";
import GET_STATUSES from "queries/getStatuses";
import IStatus from "ts/interfaces/IStatus";

interface IStatusData {
  statuses: IStatus[];
}

class StatusStore {
  @observable statuses: IStatus[] = [];
  @observable statusesAreLoading: boolean = false;

  @action.bound
  loadStatuses() {
    this.statusesAreLoading = true;
    client
      .query<IStatusData>({
        query: GET_STATUSES
      })
      .then((response: ApolloQueryResult<IStatusData>) =>
        runInAction(() => (this.statuses = response.data.statuses))
      )
      .catch((error: ApolloError) => {
        notification.error({
          message: "An error occurred while fetching statuses",
          description: error.message
        });
        runInAction(() => (this.statuses = []));
      })
      .finally(() => runInAction(() => (this.statusesAreLoading = false)));
  }
}

export default StatusStore;
