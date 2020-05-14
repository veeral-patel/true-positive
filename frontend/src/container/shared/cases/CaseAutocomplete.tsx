import { ArrowRightOutlined, SearchOutlined } from "@ant-design/icons";
import { AutoComplete, Input } from "antd";
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

        if (allCasesStore!.casesAreLoading) return <div>Loading...</div>;

        const options = allCasesStore!.cases.map(thecase => (
          <Option key={thecase.id} value={thecase.name}>
            {thecase.name}
          </Option>
        ));

        return (
          <AutoComplete dataSource={options as any} style={{ width: "100%" }}>
            <Input
              prefix={<SearchOutlined />}
              suffix={<ArrowRightOutlined />}
              placeholder="Filter cases"
            />
          </AutoComplete>
        );
      }
    }
  )
);
