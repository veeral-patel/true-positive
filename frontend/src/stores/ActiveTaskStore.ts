import { notification } from "antd";
import { ApolloError, ApolloQueryResult } from "apollo-boost";
import client from "createApolloClient";
import { action, observable, runInAction } from "mobx";
import GET_ONE_TASK from "stores/ActiveTaskStore";
import ITask from "ts/interfaces/ITask";

interface ITaskDatum {
  task: ITask;
}

class ActiveTaskStore {
  @observable activeTaskId: number | null = null;
  @observable activeTask: ITask | null = null;
  @observable activeTaskIsLoading: boolean = false;

  constructor() {
    if (this.activeTaskId === null) {
      runInAction(() => {
        this.activeTask = null;
        this.activeTaskIsLoading = false;
      });
    } else {
      this.loadActiveTask();
    }
  }

  @action.bound
  loadActiveTask() {
    this.activeTaskIsLoading = true;
    client
      .query<ITaskDatum>({
        query: GET_ONE_TASK,
        variables: { id: this.activeTaskId }
      })
      .then((response: ApolloQueryResult<ITaskDatum>) => {
        runInAction(() => (this.activeTask = response.data.task));
      })
      .catch((error: ApolloError) => {
        notification.error({
          message: "An error occurred while fetching the task",
          description: error.message
        });
      });
  }

  @action.bound
  setActiveTaskId(activeTaskId: number | null) {
    this.activeTaskId = activeTaskId;
  }
}

export default ActiveTaskStore;
