import { navigate } from "@reach/router";
import { AutoComplete, Icon, Input } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import AllCasesStore from "stores/AllCasesStore";
import { getPathToACase } from "utils/pathHelpers";

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

        let caseOptions: Object[];

        if (allCasesStore!.casesAreLoading) {
          caseOptions = [
            <Option disabled key="loading" value="loading">
              Loading...
            </Option>
          ];
        } else {
          caseOptions = allCasesStore!.cases.map(theCase => (
            <Option key={theCase.id} value={theCase.id}>
              {theCase.name}
            </Option>
          ));
          if (caseOptions.length > 5) caseOptions = caseOptions.slice(0, 5);
        }

        return (
          <AutoComplete
            onSelect={(caseId: any, Option: Object) =>
              navigate(getPathToACase(caseId))
            }
            dataSource={[
              <OptGroup key="Cases" label="Cases">
                {caseOptions}
              </OptGroup>
            ]}
          >
            <Input
              prefix={<Icon type="search" />}
              placeholder="Search"
              allowClear
              style={{ width: "250px" }}
            />
          </AutoComplete>
        );
      }
    }
  )
);
