import { message, notification } from "antd";
import { ApolloError, FetchResult } from "apollo-boost";
import client from "createApolloClient";
import { action, autorun, observable, runInAction } from "mobx";
import ADD_MEMBER from "mutations/addMember";
import CHANGE_ASSIGNEE from "mutations/changeAssignee";
import CHANGE_DESCRIPTION from "mutations/changeDescription";
import CHANGE_PRIORITY from "mutations/changePriority";
import CHANGE_ROLE from "mutations/changeRole";
import CHANGE_STATUS from "mutations/changeStatus";
import CHANGE_TAGS from "mutations/changeTags";
import CREATE_A_COMMENT from "mutations/createComment";
import CREATE_STRING_INDICATOR from "mutations/createStringIndicator";
import CREATE_A_TASK from "mutations/createTask";
import CREATE_TEXT_INDICATOR from "mutations/createTextIndicator";
import DELETE_A_COMMENT from "mutations/deleteComment";
import DELETE_AN_INDICATOR from "mutations/deleteIndicator";
import DELETE_A_TASK from "mutations/deleteTask";
import MARK_TASK_AS_DONE from "mutations/markTaskAsDone";
import REMOVE_MEMBER from "mutations/removeMember";
import RENAME_A_CASE from "mutations/renameCase";
import RENAME_AN_INDICATOR from "mutations/renameIndicator";
import RENAME_A_TASK from "mutations/renameTask";
import GET_ONE_CASE from "queries/getOneCase";
import ICase from "ts/interfaces/ICase";
import IIndicator from "ts/interfaces/IIndicator";
import ITask from "ts/interfaces/ITask";
import { NO_ASSIGNED_USER } from "utils/constants";

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
    return matchingTasks[0];
  }

  @action.bound
  getIndicator(indicatorId: number): IIndicator | null {
    if (!this.activeCase) return null;

    // filter indicators by ID (exactly one indicators should match)
    const matchingIndicators = this.activeCase.indicators.filter(
      indicator => indicator.id === indicatorId
    );

    // if no tasks match, return null
    if (matchingIndicators.length === 0) return null;
    return matchingIndicators[0];
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
  createComment(
    type: "CASE" | "TASK" | "INDICATOR",
    objectId: number,
    comment: string
  ) {
    client
      .mutate({
        variables: {
          input: {
            type,
            objectId,
            comment
          }
        },
        mutation: CREATE_A_COMMENT
      })
      .then(response => {
        message.success("Created the comment");
      })
      .catch((error: ApolloError) => {
        notification.error({
          message: "An error occurred while creating the comment",
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
  deleteIndicator(indicatorId: number) {
    client
      .mutate({
        variables: {
          input: {
            id: indicatorId
          }
        },
        mutation: DELETE_AN_INDICATOR
      })
      .then(response => {
        message.success("Deleted the indicator");
      })
      .catch((error: ApolloError) => {
        notification.error({
          message: "An error occurred while deleting the indicator",
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
  renameIndicator(indicatorId: number, newName: string) {
    client
      .mutate<ITaskDatum>({
        variables: {
          input: {
            id: indicatorId,
            name: newName
          }
        },
        mutation: RENAME_AN_INDICATOR
      })
      .then((response: FetchResult<ITaskDatum>) => {
        message.success("Renamed the indicator");
      })
      .catch((error: ApolloError) => {
        notification.error({
          message: "An error occurred while renaming the indicator",
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
  changeCaseStatus(statusName: string) {
    if (!this.activeCase) {
      notification.error({
        message: "Could not change the case's status",
        description: "No case is active"
      });
      return null;
    }

    client
      .mutate<ICaseDatum>({
        variables: {
          input: {
            caseId: this.activeCase.id,
            status: statusName
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
  changeCasePriority(priorityName: string) {
    if (!this.activeCase) {
      notification.error({
        message: "Could not change the case's priority",
        description: "No case is active"
      });
      return null;
    }

    client
      .mutate<ICaseDatum>({
        variables: {
          input: {
            caseId: this.activeCase.id,
            priority: priorityName
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
  changeCaseAssignee(username: string | null) {
    if (username === NO_ASSIGNED_USER) username = null;

    client
      .mutate<ICaseDatum>({
        variables: {
          input: {
            objectId: this.activeCaseId,
            username,
            type: "CASE"
          }
        },
        mutation: CHANGE_ASSIGNEE
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
  changeTaskAssignee(taskId: number, username: string | null) {
    if (username === NO_ASSIGNED_USER) username = null;

    client
      .mutate({
        variables: {
          input: {
            objectId: taskId,
            username,
            type: "TASK"
          }
        },
        mutation: CHANGE_ASSIGNEE
      })
      .then((response: FetchResult) => {
        message.success("Assigned the task");
      })
      .catch((error: ApolloError) => {
        notification.error({
          message: "An error occurred while assigning the task",
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
  changeDescription(objectId: number, newDescription: string, type: string) {
    // if the user wants to make the description empty
    const description = newDescription ? newDescription : "";

    client
      .mutate({
        variables: {
          input: {
            objectId,
            type,
            description
          }
        },
        mutation: CHANGE_DESCRIPTION
      })
      .then((response: FetchResult) => {
        message.success("Updated the description");
      })
      .catch((error: ApolloError) => {
        notification.error({
          message: "Couldn't update the description",
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
  createTask(name: string, caseId: number) {
    client
      .mutate({
        variables: {
          input: {
            name,
            caseId
          }
        },
        mutation: CREATE_A_TASK
      })
      .then((response: FetchResult) => {
        message.success("Created the task");
      })
      .catch((error: ApolloError) => {
        notification.error({
          message: "An error occurred while creating the task",
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
  removeCaseMember(username: string) {
    if (!this.activeCase) return;

    // removes a member from a case
    client
      .mutate({
        variables: {
          input: {
            caseId: this.activeCase.id,
            username
          }
        },
        mutation: REMOVE_MEMBER
      })
      .then((response: FetchResult) => {
        message.success(`Removed ${username}`);
      })
      .catch((error: ApolloError) => {
        notification.error({
          message: "An error occurred while removing the member",
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
  addCaseMember(username: string) {
    if (!this.activeCase) return;

    // adds a member from a case
    client
      .mutate({
        variables: {
          input: {
            username,
            caseId: this.activeCase.id,
            role: "CAN_EDIT"
          }
        },
        mutation: ADD_MEMBER
      })
      .then((response: FetchResult) => {
        message.success(`Added ${username}`);
      })
      .catch((error: ApolloError) => {
        notification.error({
          message: "An error occurred while adding the member",
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
  changeTags(
    tags: string[],
    objectId: number,
    type: "CASE" | "TASK" | "INDICATOR"
  ) {
    client
      .mutate({
        variables: {
          input: {
            tags,
            objectId,
            type
          }
        },
        mutation: CHANGE_TAGS
      })
      .then((response: FetchResult) => {
        message.success("Updated tags");
      })
      .catch((error: ApolloError) => {
        notification.error({
          message: "An error occurred while updating tags",
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
  changeRole(caseId: number, username: string, role: "CAN_VIEW" | "CAN_EDIT") {
    client
      .mutate({
        variables: {
          input: {
            caseId,
            username,
            role
          }
        },
        mutation: CHANGE_ROLE
      })
      .then((response: FetchResult) => {
        message.success("Changed role");
      })
      .catch((error: ApolloError) => {
        notification.error({
          message: "An error occurred while changing the user's role",
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
  createStringIndicator(
    caseId: number,
    indicatorName: string,
    indicator: string
  ) {
    client
      .mutate({
        variables: {
          input: {
            caseId,
            name: indicatorName,
            indicator
          }
        },
        mutation: CREATE_STRING_INDICATOR
      })
      .then((response: FetchResult) => {
        message.success("Added indicator");
      })
      .catch((error: ApolloError) => {
        notification.error({
          message: "An error occurred while adding the indicator",
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
  createTextIndicator(
    caseId: number,
    indicatorName: string,
    indicator: string
  ) {
    client
      .mutate({
        variables: {
          input: {
            caseId,
            name: indicatorName,
            indicator
          }
        },
        mutation: CREATE_TEXT_INDICATOR
      })
      .then((response: FetchResult) => {
        message.success("Added indicator");
      })
      .catch((error: ApolloError) => {
        notification.error({
          message: "An error occurred while adding the indicator",
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
  markTaskAsDone(taskId: number, done: boolean) {
    client
      .mutate({
        variables: {
          input: {
            id: taskId,
            done
          }
        },
        mutation: MARK_TASK_AS_DONE
      })
      .then((response: FetchResult) => {
        if (done) message.success("Marked task as complete");
        else message.success("Marked task as incomplete");
      })
      .catch((error: ApolloError) => {
        notification.error({
          message: "An error occurred while updating the task",
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
