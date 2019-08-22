import { action, observable, runInAction } from "mobx";

class UIStore {
  @observable openModal:
    | null
    | "ADD_TAGS_TO_CASE_MODAL"
    | "REMOVE_TAGS_FROM_CASE_MODAL"
    | "CREATE_CASE_MODAL" = null;

  @observable caseSiderIsCollapsed = false;

  constructor() {
    const value = localStorage.getItem("caseSiderIsCollapsed");
    if (value) {
      if (value == "true") {
        runInAction(() => (this.caseSiderIsCollapsed = true));
      } else if (value === "false") {
        runInAction(() => (this.caseSiderIsCollapsed = false));
      }
    }
  }

  @action.bound
  toggleCaseSider() {
    this.caseSiderIsCollapsed = !this.caseSiderIsCollapsed;
    localStorage.setItem(
      "caseSiderIsCollapsed",
      this.caseSiderIsCollapsed.toString()
    );
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
  closeModal() {
    // close whatever modal is open
    this.openModal = null;
  }
}

export default UIStore;
