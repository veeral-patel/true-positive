import { AutoComplete, Icon, Input } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import AllCasesStore from "stores/AllCasesStore";

interface CaseAutocompleteProps {
  allCasesStore?: AllCasesStore;
}

export default inject("allCasesStore")(
  observer(
    class CaseAutocomplete extends React.Component<CaseAutocompleteProps> {
      render() {
        return (
          <AutoComplete dataSource={[]} style={{ width: "100%" }}>
            <Input prefix={<Icon type="search" />} placeholder="Filter cases" />
          </AutoComplete>
        );
      }
    }
  )
);
