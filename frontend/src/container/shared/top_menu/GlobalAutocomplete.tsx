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
        // const { allCasesStore } = this.props;
        return (
          <AutoComplete
            placeholder="Search"
            dataSource={[
              <OptGroup key="Cases" label="Cases">
                <Option key="uno" value="uno">
                  Case Uno
                </Option>
              </OptGroup>
            ]}
          >
            <Input prefix={<Icon type="search" />} />
          </AutoComplete>
        );
      }
    }
  )
);
