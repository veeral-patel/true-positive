import { paths } from "utils/constants";

function getPathToACase(caseId: number) {
  return `${paths.CASES_PATH}/${caseId}`;
}

export { getPathToACase };
