import { inject, observer } from "mobx-react";
import FilterInputP from "presentational/cases/FilterInputP";
import React from "react";
import CaseStore from "stores/CaseStore";

interface IFilterInputProps {
  caseStore?: CaseStore;
}

export default inject("caseStore")(
  observer(
    class FilterInput extends React.Component<IFilterInputProps> {
      render() {
        const { caseStore } = this.props;
        return (
          <FilterInputP
            value={caseStore!.filterValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              caseStore!.setFilterValue(e.currentTarget.value)
            }
          />
        );
      }
    }
  )
);
