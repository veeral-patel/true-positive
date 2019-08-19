import { notification } from "antd";
import { ApolloError, ApolloQueryResult } from "apollo-boost";
import client from "createApolloClient";
import { action, observable } from "mobx";
import GET_CASES from "queries/getCases";
import ICase from "ts/interfaces/ICase";

interface ICaseData {
  cases: ICase[];
}

class CaseStore {
  @observable cases: ICase[] = [];
  @observable casesAreLoading: boolean = false;

  @action.bound
  loadCases() {
    this.casesAreLoading = true;
    client
      .query<ICaseData>({
        query: GET_CASES
      })
      .then(
        (response: ApolloQueryResult<ICaseData>) =>
          (this.cases = response.data.cases)
      )
      .catch((error: ApolloError) => {
        this.showErrorNotification(
          "An error occurred while fetching cases",
          error.message
        );
        this.cases = [];
      })
      .finally(() => (this.casesAreLoading = false));
  }

  showErrorNotification(message: string, description: string) {
    notification.error({
      message,
      description
    });
  }
}

export default CaseStore;
