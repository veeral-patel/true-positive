import { message, notification } from "antd";
import { ApolloError, ApolloQueryResult } from "apollo-boost";
import client from "createApolloClient";
import { action, observable, runInAction } from "mobx";
import CREATE_A_STATUS from "mutations/createStatus";
import GET_STATUSES from "queries/getStatuses";
import IStatus from "ts/interfaces/IStatus";

interface IStatusData {
  statuses: IStatus[];
}

interface IStatusDatum {
  status: IStatus;
}

class StatusStore {
  @observable statuses: IStatus[] = [];
  @observable statusesAreLoading: boolean = false;
  @observable statusIsBeingCreated: boolean = false;

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

  @action.bound
  createStatus(name: string) {
    this.statusIsBeingCreated = true;
    client
      .mutate<IStatusDatum>({
        variables: {
          input: {
            name: name
          }
        },
        mutation: CREATE_A_STATUS
      })
      .then((response: ApolloQueryResult<IStatusDatum>) => {
        runInAction(() => this.loadStatuses());
        message.success(`Created status '${name}'`);
      })
      .catch((error: ApolloError) => {
        notification.error({
          message: "An error occurred while creating the status",
          description: error.message
        });
      })
      .finally(() => runInAction(() => (this.statusIsBeingCreated = false)));
  }
}

export default StatusStore;
