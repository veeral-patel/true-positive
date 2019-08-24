import { observable } from "mobx";

class OneCaseStore {
  @observable activeCaseId: number | null = null;
}

export default OneCaseStore;
