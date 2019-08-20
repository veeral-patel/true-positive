import { action, observable } from "mobx";

class UIStore {
  @observable openModal: null | "ADD_TAGS_TO_CASE_MODAL" = null;

  @action.bound
  openAddTagsToCaseModal() {
    this.openModal = "ADD_TAGS_TO_CASE_MODAL";
  }
}

export default UIStore;
