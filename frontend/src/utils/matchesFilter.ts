import ICase from "ts/interfaces/ICase";
import IPriority from "ts/interfaces/IPriority";
import IStatus from "ts/interfaces/IStatus";
import ITask from "ts/interfaces/ITask";
import IUser from "ts/interfaces/IUser";
import formatISO8601 from "./formatISO8601";

function nameMatches(filterWord: string, object: ICase | ITask) {
  return object.name.toLowerCase().indexOf(filterWord.toLowerCase()) !== -1;
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

function createdAtMatches(filterWord: string, object: ICase | ITask) {
  return (
    formatISO8601(object.createdAt)
      .toLowerCase()
      .indexOf(filterWord.toLowerCase()) !== -1
  );
}

// Returns true iff any of the case's attributes below (but not tags) contain filterWord.
// filterWord shouldn't have any spaces.
function aCaseAttributeMatches(filterWord: string, object: ICase) {
  return (
    nameMatches(filterWord, object) ||
    statusMatches(filterWord, object.status) ||
    priorityMatches(filterWord, object.priority) ||
    // createdByMatches(filterWord, object.createdBy) ||
    assignedToMatches(filterWord, object.assignedTo) ||
    createdAtMatches(filterWord, object)
  );
}

function aTaskAttributeMatches(filterWord: string, object: ITask) {
  return (
    nameMatches(filterWord, object) ||
    createdByMatches(filterWord, object.createdBy) ||
    assignedToMatches(filterWord, object.assignedTo) ||
    createdAtMatches(filterWord, object)
  );
}

// Returns TRUE iff any of the case's tags contain filterWord. filterWord shouldn't have spaces.
function aTagMatches(filterWord: string, object: ITask | ICase) {
  for (const tag of object.tags) {
    if (tag.name.indexOf(filterWord) !== -1) return true;
  }
  return false;
}

function matchesCaseFilter(filterValue: string, object: ICase) {
  // Split our filter string into words
  const filterWords = filterValue.split(" ");

  // For a case/task to match, all of the filter words must either:
  // (1) match one of the case/task's attributes or
  // (2) match one of the case/task's tags
  for (const word of filterWords) {
    if (!aCaseAttributeMatches(word, object) && !aTagMatches(word, object))
      return false;
  }
  return true;
}

function matchesTaskFilter(filterValue: string, object: ITask) {
  // Split our filter string into words
  const filterWords = filterValue.split(" ");

  // For a case/task to match, all of the filter words must either:
  // (1) match one of the case/task's attributes or
  // (2) match one of the case/task's tags
  for (const word of filterWords) {
    if (!aTaskAttributeMatches(word, object) && !aTagMatches(word, object))
      return false;
  }
  return true;
}

export {
  statusMatches,
  priorityMatches,
  createdByMatches,
  assignedToMatches,
  aTagMatches,
  matchesCaseFilter,
  matchesTaskFilter
};
