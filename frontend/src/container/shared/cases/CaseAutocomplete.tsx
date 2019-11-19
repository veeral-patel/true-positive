import { AutoComplete, Icon, Input } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import AllCasesStore from "stores/AllCasesStore";
const { Option } = AutoComplete;

interface CaseAutocompleteProps {
  allCasesStore?: AllCasesStore;
}

export default inject("allCasesStore")(
  observer(
    class CaseAutocomplete extends React.Component<CaseAutocompleteProps> {
      componentDidMount() {
        const { allCasesStore } = this.props;
        allCasesStore!.loadCases();
      }

      render() {
        // One day, handle the case where the cases are loading.
        const { allCasesStore } = this.props;

        const options = allCasesStore!.cases.map(thecase => (
          <Option key={thecase.id}>{thecase.name}</Option>
        ));

        return (
          <AutoComplete dataSource={options} style={{ width: "100%" }}>
            <Input
              prefix={<Icon type="search" />}
              suffix={<Icon type="arrow-right" />}
              placeholder="Filter cases"
            />
          </AutoComplete>
        );
      }
    }
  )
);
