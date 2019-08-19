import { configure } from "mobx";
import CaseStore from "stores/CaseStore";

const caseStore = new CaseStore();

// only let me mutate state within actions
configure({
  enforceActions: "always"
});

export default {
  caseStore
};
