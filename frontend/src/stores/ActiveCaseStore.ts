import { action, observable } from "mobx";

class ActiveCaseStore {
  @observable activeCaseId: number | null = null;

  @action.bound
  setActiveCaseId(activeCaseId: number | null) {
    this.activeCaseId = activeCaseId;
  }
}

export default ActiveCaseStore;
