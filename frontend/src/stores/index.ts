import { configure } from "mobx";
import ActiveCaseStore from "stores/ActiveCaseStore";
import AllCasesStore from "stores/AllCasesStore";
import AllTasksStore from "stores/AllTasksStore";
import AuthStore from "stores/AuthStore";
import PriorityStore from "stores/PriorityStore";
import StatusStore from "stores/StatusStore";
import TagStore from "stores/TagStore";
import UIStore from "stores/UIStore";
import UserStore from "stores/UserStore";
import IndicatorStore from "./IndicatorStore";

const allCasesStore = new AllCasesStore();
const uiStore = new UIStore();
const statusStore = new StatusStore();
const priorityStore = new PriorityStore();
const activeCaseStore = new ActiveCaseStore();
const userStore = new UserStore();
const tagStore = new TagStore();
const allTasksStore = new AllTasksStore();
const authStore = new AuthStore();
const indicatorStore = new IndicatorStore();

// only let me mutate state within actions
configure({
  enforceActions: "always"
});

export default {
  allCasesStore,
  uiStore,
  statusStore,
  priorityStore,
  activeCaseStore,
  userStore,
  tagStore,
  allTasksStore,
  authStore,
  indicatorStore
};
