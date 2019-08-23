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

// Returns true iff the case matches the given filter value
function matchesFilter(filterValue: string, thecase: ICase) {
  return (
    nameMatches(filterValue, thecase) ||
    statusMatches(filterValue, thecase) ||
    priorityMatches(filterValue, thecase) ||
    createdByMatches(filterValue, thecase) ||
    assignedToMatches(filterValue, thecase)
  );
}

export default matchesFilter;
