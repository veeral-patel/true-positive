import { message, notification } from "antd";
import { ApolloError, FetchResult } from "apollo-boost";
import client from "createApolloClient";
import { action, autorun, observable, runInAction } from "mobx";
import ASSIGN_CASE from "mutations/assignCase";
import CHANGE_PRIORITY from "mutations/changePriority";
import CHANGE_STATUS from "mutations/changeStatus";
import DELETE_A_COMMENT from "mutations/deleteComment";
import DELETE_A_TASK from "mutations/deleteTask";
import RENAME_A_CASE from "mutations/renameCase";
import RENAME_A_TASK from "mutations/renameTask";
import GET_ONE_CASE from "queries/getOneCase";
import ICase from "ts/interfaces/ICase";
import ITask from "ts/interfaces/ITask";

interface ICaseDatum {
  case: ICase;
}

interface ITaskDatum {
  task: ITask;
}

class ActiveCaseStore {
  @observable activeCaseId: number | null = null;
  @observable activeCase: ICase | null = null;
  @observable activeCaseIsLoading: boolean = false;

  constructor() {
    // when you leave a case page, clear its derived variables
    autorun(() => {
      if (this.activeCaseId === null) {
        runInAction(() => {
          this.activeCase = null;
          this.activeCaseIsLoading = false;
        });
      } else {
        this.loadActiveCase();
      }
    });
  }

  @action.bound
  loadActiveCase() {
    this.activeCaseIsLoading = true;
    client
      .query<ICaseDatum>({
        query: GET_ONE_CASE,
        variables: { id: this.activeCaseId }
      })
      .then((response: FetchResult<ICaseDatum>) => {
        runInAction(() => {
          if (response.data) this.activeCase = response.data.case;
        });
      })
      .catch((error: ApolloError) => {
        notification.error({
          message: "An error occurred while fetching the case",
          description: error.message
        });
      })
      .finally(() => runInAction(() => (this.activeCaseIsLoading = false)));
  }

  @action.bound
  setActiveCaseId(activeCaseId: number | null) {
    this.activeCaseId = activeCaseId;
  }

  @action.bound
  getTask(taskId: number): ITask | null {
    if (!this.activeCase) return null;

    // filter tasks by ID (exactly one task should match)
    const matchingTasks = this.activeCase.tasks.filter(
      task => task.id === taskId
    );

    // if no tasks match, return null
    if (matchingTasks.length === 0) return null;

    const activeTask = matchingTasks.pop();

    // if the matching task is undefined for whatever reason, return null.
    // otherwise, return the matching task
    if (!activeTask) return null;
    return activeTask;
  }

  @action.bound
  renameActiveCase(newName: string) {
    if (!this.activeCase) {
      notification.error({
        message: "Could not rename case",
        description: "No case is active"
      });
      return null;
    }

    client
      .mutate<ICaseDatum>({
        variables: {
          input: {
            id: this.activeCase.id,
            name: newName
          }
        },
        mutation: RENAME_A_CASE
      })
      .then((response: FetchResult<ICaseDatum>) => {
        message.success("Renamed the case");
      })
      .catch((error: ApolloError) => {
        notification.error({
          message: "An error occurred while renaming the case",
          description: error.message
        });
      })
      .finally(() =>
        runInAction(() => {
          this.loadActiveCase();
        })
      );
  }

  @action.bound
  deleteComment(commentId: number) {
    client
      .mutate({
        variables: {
          input: {
            id: commentId
          }
        },
        mutation: DELETE_A_COMMENT
      })
      .then(response => {
        message.success("Deleted the comment");
      })
      .catch((error: ApolloError) => {
        notification.error({
          message: "An error occurred while deleting the comment",
          description: error.message
        });
      })
      .finally(() =>
        runInAction(() => {
          this.loadActiveCase();
        })
      );
  }

  @action.bound
  deleteTask(taskId: number) {
    client
      .mutate({
        variables: {
          input: {
            id: taskId
          }
        },
        mutation: DELETE_A_TASK
      })
      .then(response => {
        message.success("Deleted the task");
      })
      .catch((error: ApolloError) => {
        notification.error({
          message: "An error occurred while deleting the task",
          description: error.message
        });
      })
      .finally(() =>
        runInAction(() => {
          this.loadActiveCase();
        })
      );
  }

  @action.bound
  renameTask(taskId: number, newName: string) {
    client
      .mutate<ITaskDatum>({
        variables: {
          input: {
            id: taskId,
            name: newName
          }
        },
        mutation: RENAME_A_TASK
      })
      .then((response: FetchResult<ITaskDatum>) => {
        message.success("Renamed the task");
      })
      .catch((error: ApolloError) => {
        notification.error({
          message: "An error occurred while renaming the task",
          description: error.message
        });
      })
      .finally(() =>
        runInAction(() => {
          this.loadActiveCase();
        })
      );
  }

  @action.bound
  changeCaseStatus(statusId: number) {
    if (!this.activeCase) {
      notification.error({
        message: "Could not rename case",
        description: "No case is active"
      });
      return null;
    }

    client
      .mutate<ICaseDatum>({
        variables: {
          input: {
            objectId: this.activeCase.id,
            statusId: statusId,
            type: "CASE"
          }
        },
        mutation: CHANGE_STATUS
      })
      .then((response: FetchResult<ICaseDatum>) => {
        message.success("Changed the status");
      })
      .catch((error: ApolloError) => {
        notification.error({
          message: "An error occurred while changing the case's status",
          description: error.message
        });
      })
      .finally(() =>
        runInAction(() => {
          this.loadActiveCase();
        })
      );
  }

  @action.bound
  changeCasePriority(priorityId: number) {
    if (!this.activeCase) {
      notification.error({
        message: "Could not rename case",
        description: "No case is active"
      });
      return null;
    }

    client
      .mutate<ICaseDatum>({
        variables: {
          input: {
            objectId: this.activeCase.id,
            priorityId: priorityId,
            type: "CASE"
          }
        },
        mutation: CHANGE_PRIORITY
      })
      .then((response: FetchResult<ICaseDatum>) => {
        message.success("Changed the priority");
      })
      .catch((error: ApolloError) => {
        notification.error({
          message: "An error occurred while changing the case's priority",
          description: error.message
        });
      })
      .finally(() =>
        runInAction(() => {
          this.loadActiveCase();
        })
      );
  }

  @action.bound
  changeCaseAssignee(userId: number) {
    client
      .mutate<ICaseDatum>({
        variables: {
          input: {
            caseId: this.activeCaseId,
            userId
          }
        },
        mutation: ASSIGN_CASE
      })
      .then((response: FetchResult<ICaseDatum>) => {
        message.success("Assigned the case");
      })
      .catch((error: ApolloError) => {
        notification.error({
          message: "An error occurred while assigning the case",
          description: error.message
        });
      })
      .finally(() =>
        runInAction(() => {
          this.loadActiveCase();
        })
      );
  }

  @action.bound
  changeTaskStatus(taskId: number, statusId: number) {
    client
      .mutate({
        variables: {
          input: {
            objectId: taskId,
            statusId: statusId,
            type: "TASK"
          }
        },
        mutation: CHANGE_STATUS
      })
      .then((_: FetchResult) => {
        message.success("Changed the status");
      })
      .catch((error: ApolloError) => {
        notification.error({
          message: "An error occurred while changing the task's status",
          description: error.message
        });
      })
      .finally(() =>
        runInAction(() => {
          this.loadActiveCase();
        })
      );
  }

  @action.bound
  changeTaskPriority(taskId: number, priorityId: number) {
    client
      .mutate({
        variables: {
          input: {
            objectId: taskId,
            priorityId,
            type: "TASK"
          }
        },
        mutation: CHANGE_PRIORITY
      })
      .then((response: FetchResult) => {
        message.success("Changed the priority");
      })
      .catch((error: ApolloError) => {
        notification.error({
          message: "An error occurred while changing the task's priority",
          description: error.message
        });
      })
      .finally(() =>
        runInAction(() => {
          this.loadActiveCase();
        })
      );
  }
}

export default ActiveCaseStore;
