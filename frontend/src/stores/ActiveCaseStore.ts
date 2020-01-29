import { message, notification } from "antd";
import { ApolloError, FetchResult } from "apollo-boost";
import client from "createApolloClient";
import { action, autorun, observable, runInAction } from "mobx";
import ADD_GROUP_TO_CASE from "mutations/addGroupToCase";
import ADD_MEMBER from "mutations/addMember";
import CHANGE_ROLE from "mutations/changeRole";
import CREATE_A_COMMENT from "mutations/createComment";
import CREATE_STRING_INDICATOR from "mutations/createStringIndicator";
import CREATE_A_TASK from "mutations/createTask";
import CREATE_TEXT_INDICATOR from "mutations/createTextIndicator";
import DELETE_A_COMMENT from "mutations/deleteComment";
import DELETE_AN_INDICATOR from "mutations/deleteIndicator";
import DELETE_A_TASK from "mutations/deleteTask";
import REMOVE_MEMBER from "mutations/removeMember";
import UPDATE_A_COMMENT from "mutations/updateComment";
import GET_ONE_CASE from "queries/getOneCase";
import ICase from "ts/interfaces/ICase";
import IIndicator from "ts/interfaces/IIndicator";
import ITask from "ts/interfaces/ITask";
import getUsernameOfCurrentUser from "utils/currentUser";

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
  updateComment(commentId: number, newComment: string) {
    client
      .mutate({
        variables: {
          input: {
            id: commentId,
            comment: newComment
          }
        },
        mutation: UPDATE_A_COMMENT
      })
      .then(response => {
        message.success("Updated the comment");
      })
      .catch((error: ApolloError) => {
        notification.error({
          message: "An error occurred while updating the comment",
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
          message: "An error occurred while removing the user",
          description: error.message
        });
      })
      .finally(() => {
        // don't try refreshing the case if you remove yourself from it
        const usernameOfCurrentUser = getUsernameOfCurrentUser();
        if (usernameOfCurrentUser === username) return;

        runInAction(() => {
          this.loadActiveCase();
        });
      });
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
  addGroupToCase(groupId: string) {
    if (!this.activeCase) return;
    client
      .mutate({
        variables: {
          input: {
            groupId,
            caseId: this.activeCase.id,
            role: "CAN_EDIT"
          }
        },
        mutation: ADD_GROUP_TO_CASE
      })
      .then((response: FetchResult) => {
        message.success(`Added the group`);
      })
      .catch((error: ApolloError) => {
        notification.error({
          message: "An error occurred while adding group",
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
  changeRoleInCase(
    caseId: number,
    username: string,
    role: "CAN_VIEW" | "CAN_EDIT"
  ) {
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
}

export default ActiveCaseStore;
