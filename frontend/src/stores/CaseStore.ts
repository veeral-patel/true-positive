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
        notification.error({
          message: "An error occurred while fetching cases",
          description: error.message
        });
        this.cases = [];
      })
      .finally(() => (this.casesAreLoading = false));
  }
}

export default CaseStore;
