import { action, observable, runInAction } from "mobx";

class UIStore {
  @observable openModal:
    | null
    | "ADD_TAGS_TO_CASE_MODAL"
    | "REMOVE_TAGS_FROM_CASE_MODAL"
    | "CREATE_CASE_MODAL"
    | "CHANGE_CASE_STATUS_MODAL"
    | "CHANGE_CASE_PRIORITY_MODAL"
    | "ADD_COMMENT_TO_CASE"
    | "MERGE_CASES_MODAL"
    | "MERGE_ONE_CASE_MODAL"
    | "ASSIGN_CASES_MODAL" = null;

  @observable caseSiderStatus: "COLLAPSED" | "OPEN" = "OPEN";

  constructor() {
    // read caseSiderStatus from localStorage, if it's there
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

    // persist to localStorage
    localStorage.setItem("caseSiderStatus", this.caseSiderStatus);
  }

  @action.bound
  openMergeOneCaseModal() {
    this.openModal = "MERGE_ONE_CASE_MODAL";
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
  openMergeCasesModal() {
    this.openModal = "MERGE_CASES_MODAL";
  }

  @action.bound
  openAssignCasesModal() {
    this.openModal = "ASSIGN_CASES_MODAL";
  }

  @action.bound
  closeModal() {
    // close whatever modal is open
    this.openModal = null;
  }
}

export default UIStore;
