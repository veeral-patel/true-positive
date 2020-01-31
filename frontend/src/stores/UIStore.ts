import { action, observable, runInAction } from "mobx";

class UIStore {
  @observable openModal:
    | null
    | "CREATE_CASE_MODAL"
    | "MERGE_ONE_CASE_MODAL" = null;
  @observable caseSiderStatus: "COLLAPSED" | "OPEN" = "OPEN";
  @observable theme: "LIGHT" | "DARK" = "LIGHT";

  @action.bound
  toggleCaseSider() {
    if (this.caseSiderStatus === "COLLAPSED")
      runInAction(() => (this.caseSiderStatus = "OPEN"));
    else if (this.caseSiderStatus === "OPEN")
      runInAction(() => (this.caseSiderStatus = "COLLAPSED"));
  }

  @action.bound
  openMergeOneCaseModal() {
    this.openModal = "MERGE_ONE_CASE_MODAL";
  }

  @action.bound
  openCreateCaseModal() {
    this.openModal = "CREATE_CASE_MODAL";
  }

  @action.bound
  closeModal() {
    // close whatever modal is open
    this.openModal = null;
  }
}

export default UIStore;
