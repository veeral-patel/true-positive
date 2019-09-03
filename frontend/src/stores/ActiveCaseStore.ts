import { message, notification } from "antd";
import { ApolloError, ApolloQueryResult } from "apollo-boost";
import client from "createApolloClient";
import { action, autorun, observable, runInAction } from "mobx";
import RENAME_A_CASE from "mutations/renameCase";
import GET_ONE_CASE from "queries/getOneCase";
import ICase from "ts/interfaces/ICase";
import IIndicator from "ts/interfaces/IIndicator";
import ITask from "ts/interfaces/ITask";

interface ICaseDatum {
  case: ICase;
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
      .then((response: ApolloQueryResult<ICaseDatum>) => {
        runInAction(() => (this.activeCase = response.data.case));
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
  getIndicator(taskId: number, indicatorId: number): IIndicator | null {
    if (!this.activeCase) return null;

    const activeTask = this.getTask(taskId);

    if (!activeTask) return null;

    const matchingIndicators = activeTask.indicators.filter(
      indicator => indicator.id === indicatorId
    );

    // if no indicators match, return null
    if (matchingIndicators.length === 0) return null;

    const activeIndicator = matchingIndicators.pop();

    // if the matching indicator is undefined for whatever reason, return null
    if (!activeIndicator) return null;
    return activeIndicator;
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
      .then((response: ApolloQueryResult<ICaseDatum>) => {
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
}

export default ActiveCaseStore;
