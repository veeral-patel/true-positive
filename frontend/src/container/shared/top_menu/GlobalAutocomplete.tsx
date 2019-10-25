import { navigate } from "@reach/router";
import { AutoComplete, Icon, Input, Typography } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import AllCasesStore from "stores/AllCasesStore";
import AllTasksStore from "stores/AllTasksStore";
import TagStore from "stores/TagStore";
import { VIEW_ALL_RESULTS } from "utils/constants";
import { formatDateOnly } from "utils/formatISO8601";
import { getPathToACase } from "utils/pathHelpers";
import truncateString from "utils/truncateString";

const { Option, OptGroup } = AutoComplete;
const { Text } = Typography;

interface Props {
  allCasesStore?: AllCasesStore;
  tagStore?: TagStore;
  allTasksStore?: AllTasksStore;
}

interface State {
  searchValue: string;
}

export default inject("allCasesStore", "tagStore", "allTasksStore")(
  observer(
    class GlobalAutocomplete extends React.Component<Props, State> {
      state = {
        searchValue: ""
      };

      componentDidMount() {
        const { allCasesStore, allTasksStore, tagStore } = this.props;
        allCasesStore!.loadCases();
        allTasksStore!.loadTasks();
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
            <Option key={theCase.id} value={theCase.name} title="CASE">
              {truncateString(theCase.name, 35)}
              <span style={{ position: "absolute", right: "16px" }}>
                <Text type="secondary">
                  {formatDateOnly(theCase.createdAt)}
                </Text>
              </span>
            </Option>
          ));
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
        }

        // task options
        const { allTasksStore } = this.props;

        let taskOptions: Object[];

        if (allTasksStore!.tasksAreLoading) {
          taskOptions = [
            <Option disabled key="loading" value="loading">
              Loading...
            </Option>
          ];
        } else {
          taskOptions = allTasksStore!.tasks.map(task => (
            <Option key={task.id} value={task.name}>
              {task.name}
              <span style={{ position: "absolute", right: "16px" }}>
                <Text type="secondary">
                  {truncateString(task.case.name, 15)}
                </Text>
              </span>
            </Option>
          ));
        }

        return (
          <AutoComplete
            value={this.state.searchValue}
            onChange={(value: any) => this.setState({ searchValue: value })}
            dropdownMatchSelectWidth={false}
            onSelect={(value, option: any) => {
              this.setState({ searchValue: "" });

              if (option.props.title === "CASE") {
                navigate(getPathToACase(option.key));
              }
            }}
            optionLabelProp="value"
            dropdownStyle={{ width: "350px" }}
            filterOption={(inputValue, option) => {
              // filter options based on the name of the task/tag/indicator/case
              if (option.props.value) {
                // always show "View all results"
                if (option.props.value === VIEW_ALL_RESULTS) return true;
                else {
                  return (
                    option.props.value
                      .toString()
                      .toLowerCase()
                      .indexOf(inputValue.toLowerCase()) !== -1
                  );
                }
              }
              return false;
            }}
            dataSource={[
              <Option
                key={VIEW_ALL_RESULTS}
                value={VIEW_ALL_RESULTS}
                style={{
                  cursor: "default",
                  lineHeight: 2
                }}
              >
                View all results
              </Option>,
              <OptGroup
                key="Cases"
                label={
                  <span>
                    Cases
                    <a style={{ float: "right" }}>More</a>
                  </span>
                }
              >
                {caseOptions}
              </OptGroup>,
              <OptGroup
                key="Tags"
                label={
                  <span>
                    Tags
                    <a style={{ float: "right" }}>More</a>
                  </span>
                }
              >
                {tagOptions}
              </OptGroup>,
              <OptGroup
                key="Tasks"
                label={
                  <span>
                    Tasks
                    <a style={{ float: "right" }}>More</a>
                  </span>
                }
              >
                {taskOptions}
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
