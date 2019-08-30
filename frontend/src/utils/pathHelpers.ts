import { paths } from "utils/constants";

function getPathToACase(caseId: number) {
  return `${paths.CASES_PATH}/${caseId}`;
}

function getPathToCaseTasks(caseId: number) {
  const pathToCase = getPathToACase(caseId);
  return `${pathToCase}/tasks`;
}

function getPathToATask(caseId: number, taskId: number) {
  return `${paths.CASES_PATH}/${caseId}/tasks/${taskId}`;
}

export { getPathToACase, getPathToATask, getPathToCaseTasks };
