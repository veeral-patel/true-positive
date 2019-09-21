import { notification } from "antd";
import { ApolloError, FetchResult } from "apollo-boost";
import client from "createApolloClient";
import { action, observable, runInAction } from "mobx";
import GET_TASKS from "queries/getTasks";
import ITask from "ts/interfaces/ITask";

interface ITasksData {
  tasks: ITask[];
}

class AllTasksStore {
  @observable tasks: ITask[] = [];
  @observable tasksAreLoading: boolean = false;

  @action.bound
  loadTasks() {
    this.tasksAreLoading = true;
    client
      .query<ITasksData>({
        query: GET_TASKS
      })
      .then((response: FetchResult<ITasksData>) => {
        runInAction(() => {
          if (response.data) this.tasks = response.data.tasks;
        });
      })
      .catch((error: ApolloError) => {
        notification.error({
          message: "An error occurred while fetching tasks",
          description: error.message
        });
        runInAction(() => (this.tasks = []));
      })
      .finally(() => runInAction(() => (this.tasksAreLoading = false)));
  }
}

export default AllTasksStore;
