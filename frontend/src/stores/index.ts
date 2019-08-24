import { configure } from "mobx";
import ActiveCaseStore from "stores/ActiveCaseStore";
import AllCasesStore from "stores/AllCasesStore";
import PriorityStore from "stores/PriorityStore";
import StatusStore from "stores/StatusStore";
import UIStore from "stores/UIStore";

const allCasesStore = new AllCasesStore();
const uiStore = new UIStore();
const statusStore = new StatusStore();
const priorityStore = new PriorityStore();
const activeCaseStore = new ActiveCaseStore();

// only let me mutate state within actions
configure({
  enforceActions: "always"
});

export default {
  allCasesStore,
  uiStore,
  statusStore,
  priorityStore,
  activeCaseStore
};
