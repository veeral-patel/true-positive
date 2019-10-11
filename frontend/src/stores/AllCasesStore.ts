import { navigate } from "@reach/router";
import { message, notification } from "antd";
import { ApolloError, FetchResult } from "apollo-boost";
import client from "createApolloClient";
import { action, computed, observable, runInAction } from "mobx";
import CREATE_A_CASE from "mutations/createCase";
import DELETE_A_CASE from "mutations/deleteCase";
import GET_CASES from "queries/getCases";
import rootStore from "stores";
import ICase from "ts/interfaces/ICase";
import matchesFilter from "utils/matchesFilter";
import { getPathToACase } from "utils/pathHelpers";

interface ICaseData {
  cases: ICase[];
}

interface ICaseDatum {
  createCase: {
    case: ICase;
  };
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
      .then((response: FetchResult<ICaseData>) => {
        runInAction(() => {
          if (response.data) this.cases = response.data.cases;
        });
      })
      .catch((error: ApolloError) => {
        notification.error({
          message: "An error occurred while fetching cases",
          description: error.message
        });
        runInAction(() => (this.cases = []));
      })
      .finally(() => runInAction(() => (this.casesAreLoading = false)));
  }

  @action.bound
  deleteCase(caseId: number) {
    client
      .mutate({
        variables: {
          input: {
            id: caseId
          }
        },
        mutation: DELETE_A_CASE
      })
      .then(response => message.success("Deleted the case"))
      .catch((error: ApolloError) => {
        notification.error({
          message: "An error occurred while deleting the case",
          description: error.message
        });
      })
      .finally(() =>
        runInAction(() => {
          this.loadCases();
        })
      );
  }

  @action.bound
  createCase(name: string, statusName: string, priorityName: string) {
    client
      .mutate<ICaseDatum>({
        variables: {
          input: {
            name,
            status: statusName,
            priority: priorityName
          }
        },
        mutation: CREATE_A_CASE
      })
      // keep in mind: we're not requesting the whole case object here, just a couple fields
      .then(response => {
        // show toast
        message.success("Created the case");

        // reload the cases in our store
        this.loadCases();

        // open that case
        if (
          response &&
          response.data &&
          response.data.createCase &&
          response.data.createCase.case
        ) {
          navigate(getPathToACase(response.data.createCase.case.id));

          // remember to close the create case modal!
          rootStore.uiStore.closeModal();
        }
      })
      .catch((error: ApolloError) => {
        notification.error({
          message: "An error occurred while creating the case",
          description: error.message
        });
      });
  }

  // --------- computed properties -----------

  @computed
  get numberOfSelectedCases() {
    return this.selectedCases.length;
  }

  @computed
  get numberOfCases() {
    return this.cases.length;
  }

  // ----- filtering logic ---------

  @computed
  get filteredCases() {
    const _this = this;
    return this.cases.filter((thecase: ICase) =>
      matchesFilter(_this.filterValue, thecase)
    );
  }

  @action.bound
  setFilterValue(filterValue: string) {
    this.filterValue = filterValue;
  }

  // ------- selection logic ----------

  @action.bound
  setSelectedCases(selectedCases: ICase[]) {
    this.selectedCases = selectedCases;
  }

  // -------- bulk operations ----------

  @action.bound
  addTagsToSelectedCases() {
    // message.success(`Added tags to ${this!.numberOfSelectedCases} case(s)`);
  }

  @action.bound
  removeTagsFromSelectedCases() {
    // message.success(`Removed tags from ${this!.numberOfSelectedCases} case(s)`);
  }
}

export default CaseStore;
