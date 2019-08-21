import { action, observable } from "mobx";

class UIStore {
  @observable openModal:
    | null
    | "ADD_TAGS_TO_CASE_MODAL"
    | "REMOVE_TAGS_FROM_CASE_MODAL"
    | "CREATE_CASE_MODAL" = null;

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
