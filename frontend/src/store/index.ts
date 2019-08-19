import { configure } from "mobx";
import CaseStore from "store/CaseStore";

const caseStore = new CaseStore();

// only let me mutate state within actions
configure({
  enforceActions: true
});

export default {
  caseStore
};
