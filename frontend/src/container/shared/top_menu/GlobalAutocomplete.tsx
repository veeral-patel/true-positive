import { AutoComplete, Icon, Input } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import AllCasesStore from "stores/AllCasesStore";

const { Option, OptGroup } = AutoComplete;

interface Props {
  allCasesStore?: AllCasesStore;
}

export default inject("allCasesStore")(
  observer(
    class GlobalAutocomplete extends React.Component<Props> {
      componentDidMount() {
        const { allCasesStore } = this.props;
        allCasesStore!.loadCases();
      }

      render() {
        const { allCasesStore } = this.props;

        let caseOptions: any[];

        if (allCasesStore!.casesAreLoading) {
          caseOptions = [];
        } else {
          caseOptions = allCasesStore!.cases.map(theCase => (
            <Option key={theCase.id} value={theCase.id}>
              {theCase.name}
            </Option>
          ));
        }

        return (
          <AutoComplete
            dataSource={[
              <OptGroup key="Cases" label="Cases">
                {caseOptions}
              </OptGroup>
            ]}
          >
            <Input prefix={<Icon type="search" />} placeholder="Search" />
          </AutoComplete>
        );
      }
    }
  )
);
