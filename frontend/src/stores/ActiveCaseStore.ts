import { action, autorun, observable, runInAction } from "mobx";
import ICase from "ts/interfaces/ICase";

class ActiveCaseStore {
  @observable activeCaseId: number | null = null;
  @observable activeCase: ICase | null = null;
  @observable activeCaseIsLoading: boolean = false;

  constructor() {
    // when you leave a case page, clear its derived variables
    autorun(() => {
      if (this.activeCaseId === null) {
        runInAction(() => {
          this.activeCase = null;
          this.activeCaseIsLoading = false;
        });
      }
    });
  }

  @action.bound
  setActiveCaseId(activeCaseId: number | null) {
    this.activeCaseId = activeCaseId;
  }
}

export default ActiveCaseStore;
