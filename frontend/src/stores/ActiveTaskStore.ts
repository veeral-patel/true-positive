import { action, observable, runInAction } from "mobx";
import ITask from "ts/interfaces/ITask";

class ActiveTaskStore {
  @observable activeTaskId: number | null = null;
  @observable activeTask: ITask | null = null;
  @observable activeTaskIsLoading: boolean = false;

  constructor() {
    if (this.activeTaskId === null) {
      runInAction(() => {
        this.activeTask = null;
        this.activeTaskIsLoading = false;
      });
    } else {
      this.loadActiveTask();
    }
  }

  @action.bound
  setActiveTaskId(activeTaskId: number) {
    this.activeTaskId = activeTaskId;
  }
}

export default ActiveTaskStore;
