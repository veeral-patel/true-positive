import { observable } from "mobx";
import ICase from "ts/interfaces/ICase";

class CaseStore {
  @observable cases: ICase[] = [];
}

export default CaseStore;
