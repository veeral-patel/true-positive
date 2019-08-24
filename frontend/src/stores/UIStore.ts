import { action, observable, runInAction } from "mobx";

class UIStore {
  @observable openModal:
    | null
    | "ADD_TAGS_TO_CASE_MODAL"
    | "REMOVE_TAGS_FROM_CASE_MODAL"
    | "CREATE_CASE_MODAL"
    | "CHANGE_CASE_STATUS_MODAL"
    | "CHANGE_CASE_PRIORITY_MODAL"
    | "ADD_COMMENT_TO_CASE" = null;

  @observable caseSiderStatus: "COLLAPSED" | "OPEN" = "OPEN";

  constructor() {
    const value = localStorage.getItem("caseSiderStatus");
    if (value) {
      if (value === "COLLAPSED")
        runInAction(() => (this.caseSiderStatus = "COLLAPSED"));
      else if (value === "OPEN")
        runInAction(() => (this.caseSiderStatus = "OPEN"));
    }
  }

  @action.bound
  toggleCaseSider() {
    if (this.caseSiderStatus === "COLLAPSED")
      runInAction(() => (this.caseSiderStatus = "OPEN"));
    else if (this.caseSiderStatus === "OPEN")
      runInAction(() => (this.caseSiderStatus = "COLLAPSED"));
    localStorage.setItem("caseSiderStatus", this.caseSiderStatus);
  }

  @action.bound
  openAddTagsToCaseModal() {
    this.openModal = "ADD_TAGS_TO_CASE_MODAL";
  }

  @action.bound
  openRemoveTagsFromCaseModal() {
    this.openModal = "REMOVE_TAGS_FROM_CASE_MODAL";
  }

  @action.bound
  openCreateCaseModal() {
    this.openModal = "CREATE_CASE_MODAL";
  }

  @action.bound
  openChangeCaseStatusModal() {
    this.openModal = "CHANGE_CASE_STATUS_MODAL";
  }

  @action.bound
  openChangeCasePriorityModal() {
    this.openModal = "CHANGE_CASE_PRIORITY_MODAL";
  }

  @action.bound
  openAddCommentToCaseModal() {
    this.openModal = "ADD_COMMENT_TO_CASE";
  }

  @action.bound
  closeModal() {
    // close whatever modal is open
    this.openModal = null;
  }
}

export default UIStore;
