import ICase from "ts/interfaces/ICase";
import IPriority from "ts/interfaces/IPriority";
import IStatus from "ts/interfaces/IStatus";
import IUser from "ts/interfaces/IUser";
import formatISO8601 from "./formatISO8601";

function nameMatches(filterWord: string, theCase: ICase) {
  return theCase.name.toLowerCase().indexOf(filterWord.toLowerCase()) !== -1;
}

function statusMatches(filterWord: string, status: IStatus) {
  return status.name.toLowerCase().indexOf(filterWord.toLowerCase()) !== -1;
}

function priorityMatches(filterWord: string, priority: IPriority) {
  return priority.name.toLowerCase().indexOf(filterWord.toLowerCase()) !== -1;
}

function assignedToMatches(filterWord: string, assignedTo: IUser | null) {
  return assignedTo
    ? assignedTo.username.toLowerCase().indexOf(filterWord.toLowerCase()) !== -1
    : false;
}

function createdByMatches(filterWord: string, createdBy: IUser) {
  return (
    createdBy.username.toLowerCase().indexOf(filterWord.toLowerCase()) !== -1
  );
}

function createdAtMatches(filterWord: string, theCase: ICase) {
  return (
    formatISO8601(theCase.createdAt)
      .toLowerCase()
      .indexOf(filterWord.toLowerCase()) !== -1
  );
}

// Returns true iff any of the case's attributes below (but not tags) contain filterWord.
// filterWord shouldn't have any spaces.
function anAttributeMatches(filterWord: string, theCase: ICase) {
  return (
    nameMatches(filterWord, theCase) ||
    statusMatches(filterWord, theCase.status) ||
    priorityMatches(filterWord, theCase.priority) ||
    createdByMatches(filterWord, theCase.createdBy) ||
    assignedToMatches(filterWord, theCase.assignedTo) ||
    createdAtMatches(filterWord, theCase)
  );
}

// Returns TRUE iff any of the case's tags contain filterWord. filterWord shouldn't have spaces.
function aTagMatches(filterWord: string, theCase: ICase) {
  for (const tag of theCase.tags) {
    if (tag.name.indexOf(filterWord) !== -1) return true;
  }
  return false;
}

// Returns true iff the case matches the given filter value
function matchesFilter(filterValue: string, theCase: ICase) {
  // Split our filter string into words
  const filterWords = filterValue.split(" ");

  // For a case to match, all of the filter words must either:
  // (1) match one of the case's attributes or
  // (2) match one of the case's tags
  for (const word of filterWords) {
    if (!anAttributeMatches(word, theCase) && !aTagMatches(word, theCase))
      return false;
  }
  return true;
}

export default matchesFilter;
export {
  statusMatches,
  priorityMatches,
  createdByMatches,
  assignedToMatches,
  aTagMatches
};
