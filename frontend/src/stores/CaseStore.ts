import { notification } from "antd";
import { ApolloError, ApolloQueryResult } from "apollo-boost";
import client from "createApolloClient";
import { action, computed, observable, runInAction } from "mobx";
import GET_CASES from "queries/getCases";
import ICase from "ts/interfaces/ICase";

interface ICaseData {
  cases: ICase[];
}

class CaseStore {
  @observable cases: ICase[] = [];
  @observable casesAreLoading: boolean = false;
  @observable selectedCases: ICase[] = [];
  @observable filterValue: string = "";

  @action.bound
  loadCases() {
    this.casesAreLoading = true;
    client
      .query<ICaseData>({
        query: GET_CASES
      })
      .then((response: ApolloQueryResult<ICaseData>) =>
        runInAction(() => (this.cases = response.data.cases))
      )
      .catch((error: ApolloError) => {
        notification.error({
          message: "An error occurred while fetching cases",
          description: error.message
        });
        runInAction(() => (this.cases = []));
      })
      .finally(() => runInAction(() => (this.casesAreLoading = false)));
  }

  @computed
  get filteredCases() {
    const _this = this;
    return this.cases.filter(function(thecase: ICase) {
      const assignedToMatches = thecase.assignedTo
        ? thecase.assignedTo.username
            .toLowerCase()
            .indexOf(_this.filterValue.toLowerCase()) !== -1
        : false;
      return (
        thecase.name.toLowerCase().indexOf(_this.filterValue.toLowerCase()) !==
          -1 ||
        thecase.status.name
          .toLowerCase()
          .indexOf(_this.filterValue.toLowerCase()) !== -1 ||
        thecase.priority.name
          .toLowerCase()
          .indexOf(_this.filterValue.toLowerCase()) !== -1 ||
        thecase.createdBy.username
          .toLowerCase()
          .indexOf(_this.filterValue.toLowerCase()) !== -1 ||
        assignedToMatches
      );
    });
  }

  @computed get numberOfSelectedCases() {
    return this.selectedCases.length;
  }

  @action.bound
  setSelectedCases(selectedCases: ICase[]) {
    this.selectedCases = selectedCases;
  }

  @action.bound
  setFilterValue(filterValue: string) {
    this.filterValue = filterValue;
  }
}

export default CaseStore;
