import { notification } from "antd";
import { ApolloError, ApolloQueryResult } from "apollo-boost";
import client from "createApolloClient";
import { action, autorun, observable, runInAction } from "mobx";
import GET_ONE_CASE from "queries/getOneCase";
import ICase from "ts/interfaces/ICase";

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
}

export default ActiveCaseStore;
