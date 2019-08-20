import { observable } from "mobx";

class UIStore {
  @observable openModal: null | "ADD_TAGS_MODAL" = null;
}

export default UIStore;
