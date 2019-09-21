import { paths } from "utils/constants";

export function getPathToACase(caseId: number) {
  return `${paths.CASES_PATH}/${caseId}`;
}

export function getPathToACaseInfo(caseId: number) {
  return `${paths.CASES_PATH}/${caseId}/info`;
}

export function getPathToCaseTasks(caseId: number) {
  const pathToCase = getPathToACase(caseId);
  return `${pathToCase}/tasks`;
}

export function getPathToCaseIndicators(caseId: number) {
  const pathToCase = getPathToACase(caseId);
  return `${pathToCase}/indicators`;
}

export function getPathToACaseTree(caseId: number) {
  const pathToCase = getPathToACase(caseId);
  return `${pathToCase}/tree`;
}

export function getPathToACaseMembers(caseId: number) {
  const pathToCase = getPathToACase(caseId);
  return `${pathToCase}/members`;
}

export function getPathToATask(caseId: number, taskId: number) {
  return `${paths.CASES_PATH}/${caseId}/tasks/${taskId}`;
}
