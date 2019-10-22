import { notification } from "antd";
import { ApolloError, FetchResult } from "apollo-boost";
import client from "createApolloClient";
import { action, computed, observable, runInAction } from "mobx";
import GET_TASKS from "queries/getTasks";
import ITask from "ts/interfaces/ITask";
import getUsernameOfCurrentUser from "utils/currentUser";
import { matchesTaskFilter } from "utils/matchesFilter";

interface ITasksData {
  tasks: ITask[];
}

class AllTasksStore {
  @observable tasks: ITask[] = [];
  @observable tasksAreLoading: boolean = false;
  @observable filterValue: string = "";
  @observable assignedOrAll: "ASSIGNED" | "ALL" = "ASSIGNED";
  @observable doneFilter: "NOT_DONE" | "DONE" | "ALL" = "NOT_DONE";

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

  // ----- filtering logic ---------

  @computed
  get filteredTasks() {
    const _this = this;

    // filter based on column filters
    var filtered = this.tasks.filter((task: ITask) =>
      matchesTaskFilter(_this.filterValue, task)
    );

    // filter based on Assigned/All radio
    if (this.assignedOrAll === "ALL") {
      filtered = filtered;
    } else if (this.assignedOrAll === "ASSIGNED") {
      const usernameOfCurrentUser = getUsernameOfCurrentUser();
      filtered = filtered.filter(
        task =>
          task.assignedTo && task.assignedTo.username === usernameOfCurrentUser
      );
    } else {
      filtered = [];
    }

    // filter based on Done/Not Done/All radio
    if (this.doneFilter === "ALL") {
      filtered = filtered;
    } else if (this.doneFilter === "DONE") {
      filtered = filtered.filter(task => task.done);
    } else if (this.doneFilter === "NOT_DONE") {
      filtered = filtered.filter(task => !task.done);
    } else {
      filtered = [];
    }
    return filtered;
  }

  @action.bound
  setDoneFilter(newFilter: "NOT_DONE" | "DONE" | "ALL") {
    this.doneFilter = newFilter;
  }

  @action.bound
  setAssignedFilter(newFilter: "ASSIGNED" | "ALL") {
    this.assignedOrAll = newFilter;
  }

  @action.bound
  setFilterValue(filterValue: string) {
    this.filterValue = filterValue;
  }
}

export default AllTasksStore;
