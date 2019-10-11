import { Icon, Input } from "antd";
import { inject, observer } from "mobx-react";
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
          <Input
            allowClear
            value={allCasesStore!.filterValue}
            placeholder="Filter cases"
            prefix={<Icon type="search" />}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              allCasesStore!.setFilterValue(e.currentTarget.value)
            }
          />
        );
      }
    }
  )
);
