import { inject, observer } from "mobx-react";
import FilterInputP from "presentational/cases/FilterInputP";
import React from "react";
import CaseStore from "stores/AllCasesStore";

interface IFilterInputProps {
  allCasesStore?: CaseStore;
}

export default inject("allCasesStore")(
  observer(
    class FilterInput extends React.Component<IFilterInputProps> {
      render() {
        const { allCasesStore } = this.props;
        return (
          <FilterInputP
            value={allCasesStore!.filterValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              allCasesStore!.setFilterValue(e.currentTarget.value)
            }
          />
        );
      }
    }
  )
);
