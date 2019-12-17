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

export function getPathToCaseForms(caseId: number) {
  const pathToCase = getPathToACase(caseId);
  return `${pathToCase}/forms`;
}

export function getPathToACaseMembers(caseId: number) {
  const pathToCase = getPathToACase(caseId);
  return `${pathToCase}/members`;
}

export function getPathToATask(caseId: number, taskId: number) {
  return `${paths.CASES_PATH}/${caseId}/tasks/${taskId}`;
}

export function getPathToAnIndicator(caseId: number, indicatorId: number) {
  return `${paths.CASES_PATH}/${caseId}/indicators/${indicatorId}`;
}
