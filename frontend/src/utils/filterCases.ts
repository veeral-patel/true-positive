import ICase from "ts/interfaces/ICase";

function nameMatches(filterValue: string, thecase: ICase) {
  return thecase.name.toLowerCase().indexOf(filterValue.toLowerCase()) !== -1;
}

function statusMatches(filterValue: string, thecase: ICase) {
  return (
    thecase.status.name.toLowerCase().indexOf(filterValue.toLowerCase()) !== -1
  );
}

function priorityMatches(filterValue: string, thecase: ICase) {
  return (
    thecase.priority.name.toLowerCase().indexOf(filterValue.toLowerCase()) !==
    -1
  );
}

function assignedToMatches(filterValue: string, thecase: ICase) {
  return thecase.assignedTo
    ? thecase.assignedTo.username
        .toLowerCase()
        .indexOf(filterValue.toLowerCase()) !== -1
    : false;
}

function createdByMatches(filterValue: string, thecase: ICase) {
  return (
    thecase.createdBy.username
      .toLowerCase()
      .indexOf(filterValue.toLowerCase()) !== -1
  );
}

// Returns true iff any of the case's attributes below (but not tags) contain WORD.
// WORD shouldn't have any spaces.
function anAttributeMatches(word: string, thecase: ICase) {
  return (
    nameMatches(word, thecase) ||
    statusMatches(word, thecase) ||
    priorityMatches(word, thecase) ||
    createdByMatches(word, thecase) ||
    assignedToMatches(word, thecase)
  );
}

// Returns TRUE iff any of the case's tags contain WORD. WORD shouldn't have spaces.
function aTagMatches(word: string, thecase: ICase) {
  for (const tag of thecase.tags) {
    if (tag.indexOf(word) !== -1) return true;
  }
  return false;
}

// Returns true iff the case matches the given filter value
function matchesFilter(filterValue: string, thecase: ICase) {
  // Split our filter string into words
  const filterWords = filterValue.split(" ");

  // For a case to match, all of the filter words must either:
  // (1) match one of the case's attributes or
  // (2) match one of the case's tags
  for (const word of filterWords) {
    if (!anAttributeMatches(word, thecase) && !aTagMatches(word, thecase))
      return false;
  }
  return true;
}

export default matchesFilter;
