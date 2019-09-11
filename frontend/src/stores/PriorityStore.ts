import { message, notification } from "antd";
import { ApolloError, FetchResult } from "apollo-boost";
import client from "createApolloClient";
import { action, observable, runInAction } from "mobx";
import CREATE_A_PRIORITY from "mutations/createPriority";
import DELETE_A_PRIORITY from "mutations/deletePriority";
import RENAME_A_PRIORITY from "mutations/renamePriority";
import GET_PRIORITIES from "queries/getPriorities";
import IPriority from "ts/interfaces/IPriority";

interface IPriorityData {
  priorities: IPriority[];
}

interface IPriorityDatum {
  priority: IPriority;
}

class PriorityStore {
  @observable priorities: IPriority[] = [];
  @observable prioritiesAreLoading: boolean = false;
  @observable priorityIsBeingCreated = false;

  @action.bound
  loadPriorities() {
    this.prioritiesAreLoading = true;
    client
      .query<IPriorityData>({
        query: GET_PRIORITIES
      })
      .then((response: FetchResult<IPriorityData>) => {
        runInAction(() => {
          if (response.data) this.priorities = response.data.priorities;
        });
      })
      .catch((error: ApolloError) => {
        notification.error({
          message: "An error occurred while fetching priorities",
          description: error.message
        });
        runInAction(() => (this.priorities = []));
      })
      .finally(() => runInAction(() => (this.prioritiesAreLoading = false)));
  }

  @action.bound
  createPriority(name: string) {
    this.priorityIsBeingCreated = false;
    client
      .mutate<IPriorityDatum>({
        variables: {
          input: {
            name: name
          }
        },
        mutation: CREATE_A_PRIORITY
      })
      .then((response: FetchResult<IPriorityDatum>) => {
        message.success(`Created priority '${name}'`);
      })
      .catch((error: ApolloError) => {
        notification.error({
          message: "An error occurred while creating the priority",
          description: error.message
        });
      })
      .finally(() =>
        runInAction(() => {
          this.priorityIsBeingCreated = false;
          this.loadPriorities();
        })
      );
  }

  @action.bound
  deletePriority(id: number) {
    client
      .mutate<IPriorityDatum>({
        variables: {
          input: {
            id: id
          }
        },
        mutation: DELETE_A_PRIORITY
      })
      .then((response: FetchResult<IPriorityDatum>) => {
        message.success("Deleted the priority");
      })
      .catch((error: ApolloError) => {
        notification.error({
          message: "An error occurred while deleting the priority",
          description: error.message
        });
      })
      .finally(() =>
        runInAction(() => {
          this.loadPriorities();
        })
      );
  }

  @action.bound renamePriority(id: number, newName: string) {
    client
      .mutate<IPriorityDatum>({
        variables: {
          input: {
            id: id,
            name: newName
          }
        },
        mutation: RENAME_A_PRIORITY
      })
      .then((response: FetchResult<IPriorityDatum>) => {
        message.success("Renamed the priority");
      })
      .catch((error: ApolloError) => {
        notification.error({
          message: "An error occurred while renaming the priority",
          description: error.message
        });
      })
      .finally(() =>
        runInAction(() => {
          this.loadPriorities();
        })
      );
  }
}

export default PriorityStore;
