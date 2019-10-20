import { navigate } from "@reach/router";
import { AutoComplete, Icon, Input } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import AllCasesStore from "stores/AllCasesStore";
import TagStore from "stores/TagStore";
import { getPathToACase } from "utils/pathHelpers";

const { Option, OptGroup } = AutoComplete;

interface Props {
  allCasesStore?: AllCasesStore;
  tagStore?: TagStore;
}

export default inject("allCasesStore", "tagStore")(
  observer(
    class GlobalAutocomplete extends React.Component<Props> {
      componentDidMount() {
        const { allCasesStore, tagStore } = this.props;
        allCasesStore!.loadCases();
        tagStore!.loadTags();
      }

      render() {
        // case options
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

          // show only first 5 matches
          if (caseOptions.length > 5) caseOptions = caseOptions.slice(0, 3);
        }

        // tag options
        const { tagStore } = this.props;

        let tagOptions: Object[];

        if (tagStore!.tagsAreLoading) {
          tagOptions = [
            <Option disabled key="loading" value="loading">
              Loading...
            </Option>
          ];
        } else {
          tagOptions = tagStore!.tags.map(tag => (
            <Option key={tag.name} value={tag.name}>
              {tag.name}
            </Option>
          ));

          // show only first 5 matches
          if (tagOptions.length > 5) tagOptions = tagOptions.slice(0, 3);
        }

        return (
          <AutoComplete
            onSelect={(caseId: any, Option: Object) =>
              navigate(getPathToACase(caseId))
            }
            dataSource={[
              <OptGroup key="Cases" label="Cases">
                {caseOptions}
              </OptGroup>,
              <OptGroup key="Tags" label="Tags">
                {tagOptions}
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
