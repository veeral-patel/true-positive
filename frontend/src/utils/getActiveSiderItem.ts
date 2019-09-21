import { CASE_SIDER_INFO, CASE_SIDER_TASKS } from "utils/constants";

function getActiveSiderItem(path: string): string[] {
  if (path.endsWith("/info") || path.endsWith("/info/")) {
    return [CASE_SIDER_INFO];
  } else if (path.endsWith("/tasks") || path.endsWith("/tasks/")) {
    return [CASE_SIDER_TASKS];
  }
  return [];
}

export default getActiveSiderItem;
