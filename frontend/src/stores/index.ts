import { configure } from "mobx";
import CaseStore from "stores/CaseStore";
import PriorityStore from "stores/PriorityStore";
import StatusStore from "stores/StatusStore";
import UIStore from "stores/UIStore";

const allCasesStore = new CaseStore();
const uiStore = new UIStore();
const statusStore = new StatusStore();
const priorityStore = new PriorityStore();

// only let me mutate state within actions
configure({
  enforceActions: "always"
});

export default {
  allCasesStore,
  uiStore,
  statusStore,
  priorityStore
};
