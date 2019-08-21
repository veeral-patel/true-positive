import { configure } from "mobx";
import CaseStore from "stores/CaseStore";
import StatusStore from "stores/StatusStore";
import UIStore from "stores/UIStore";

const caseStore = new CaseStore();
const uiStore = new UIStore();
const statusStore = new StatusStore();

// only let me mutate state within actions
configure({
  enforceActions: "always"
});

export default {
  caseStore,
  uiStore,
  statusStore
};
