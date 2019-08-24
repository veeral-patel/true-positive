import { observable } from "mobx";

class ActiveCaseStore {
  @observable activeCaseId: number | null = null;
}

export default ActiveCaseStore;
