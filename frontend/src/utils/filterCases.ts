import ICase from "ts/interfaces/ICase";

// Returns true iff the case matches the given filter value
function matchesFilter(filterValue: string, thecase: ICase) {
  const assignedToMatches = thecase.assignedTo
    ? thecase.assignedTo.username
        .toLowerCase()
        .indexOf(filterValue.toLowerCase()) !== -1
    : false;
  return (
    thecase.name.toLowerCase().indexOf(filterValue.toLowerCase()) !== -1 ||
    thecase.status.name.toLowerCase().indexOf(filterValue.toLowerCase()) !==
      -1 ||
    thecase.priority.name.toLowerCase().indexOf(filterValue.toLowerCase()) !==
      -1 ||
    thecase.createdBy.username
      .toLowerCase()
      .indexOf(filterValue.toLowerCase()) !== -1 ||
    assignedToMatches
  );
}

export default matchesFilter;
