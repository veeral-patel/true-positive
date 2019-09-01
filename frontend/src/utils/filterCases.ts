import ICase from "ts/interfaces/ICase";

function nameMatches(filterWord: string, theCase: ICase) {
  return theCase.name.toLowerCase().indexOf(filterWord.toLowerCase()) !== -1;
}

function statusMatches(filterWord: string, theCase: ICase) {
  return (
    theCase.status.name.toLowerCase().indexOf(filterWord.toLowerCase()) !== -1
  );
}

function priorityMatches(filterWord: string, theCase: ICase) {
  return (
    theCase.priority.name.toLowerCase().indexOf(filterWord.toLowerCase()) !== -1
  );
}

function assignedToMatches(filterWord: string, theCase: ICase) {
  return theCase.assignedTo
    ? theCase.assignedTo.username
        .toLowerCase()
        .indexOf(filterWord.toLowerCase()) !== -1
    : false;
}

function createdByMatches(filterWord: string, theCase: ICase) {
  return (
    theCase.createdBy.username
      .toLowerCase()
      .indexOf(filterWord.toLowerCase()) !== -1
  );
}

function createdAtMatches(filterWord: string, theCase: ICase) {
  return (
    theCase.formattedCreatedAt
      .toLowerCase()
      .indexOf(filterWord.toLowerCase()) !== -1
  );
}

// Returns true iff any of the case's attributes below (but not tags) contain filterWord.
// filterWord shouldn't have any spaces.
function anAttributeMatches(filterWord: string, theCase: ICase) {
  return (
    nameMatches(filterWord, theCase) ||
    statusMatches(filterWord, theCase) ||
    priorityMatches(filterWord, theCase) ||
    createdByMatches(filterWord, theCase) ||
    assignedToMatches(filterWord, theCase) ||
    createdAtMatches(filterWord, theCase)
  );
}

// Returns TRUE iff any of the case's tags contain filterWord. filterWord shouldn't have spaces.
function aTagMatches(filterWord: string, theCase: ICase) {
  for (const tag of theCase.tags) {
    if (tag.indexOf(filterWord) !== -1) return true;
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
