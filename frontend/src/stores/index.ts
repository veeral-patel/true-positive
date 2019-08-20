import { configure } from "mobx";
import CaseStore from "stores/CaseStore";
import UIStore from "stores/UIStore";

const caseStore = new CaseStore();
const uiStore = new UIStore();

// only let me mutate state within actions
configure({
  enforceActions: "always"
});

export default {
  caseStore,
  uiStore
};
