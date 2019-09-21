import {
  CASE_SIDER_INDICATORS,
  CASE_SIDER_INFO,
  CASE_SIDER_MEMBERS,
  CASE_SIDER_TASKS,
  CASE_SIDER_TREE
} from "utils/constants";

function getActiveSiderItem(path: string): string[] {
  if (path.endsWith("/info") || path.endsWith("/info/")) {
    return [CASE_SIDER_INFO];
  } else if (path.endsWith("/tasks") || path.endsWith("/tasks/")) {
    return [CASE_SIDER_TASKS];
  } else if (path.endsWith("/indicators") || path.endsWith("/indicators/")) {
    return [CASE_SIDER_INDICATORS];
  } else if (path.endsWith("/tree") || path.endsWith("/tree/")) {
    return [CASE_SIDER_TREE];
  } else if (path.endsWith("/members") || path.endsWith("/members/")) {
    return [CASE_SIDER_MEMBERS];
  }
  return [];
}

export default getActiveSiderItem;
