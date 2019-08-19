import { notification } from "antd";
import client from "createApolloClient";
import { action, observable } from "mobx";
import GET_CASES from "queries/getCases";
import ICase from "ts/interfaces/ICase";

class CaseStore {
  @observable cases: ICase[] = [];
  @observable casesAreLoading: boolean = false;

  @action
  loadCases() {
    this.casesAreLoading = true;
    client
      .query({
        query: GET_CASES
      })
      .then(response => (this.cases = response.data.cases))
      .catch(error =>
        this.showErrorNotification(
          "An error occurred while fetching cases",
          error.message
        )
      )
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
