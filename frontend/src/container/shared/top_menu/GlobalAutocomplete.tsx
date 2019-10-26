import { navigate } from "@reach/router";
import { AutoComplete, Icon, Input, Typography } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import AllCasesStore from "stores/AllCasesStore";
import AllTasksStore from "stores/AllTasksStore";
import IndicatorStore from "stores/IndicatorStore";
import TagStore from "stores/TagStore";
import { paths, VIEW_ALL_RESULTS } from "utils/constants";
import { formatDateOnly } from "utils/formatISO8601";
import {
  getPathToACase,
  getPathToAnIndicator,
  getPathToATask
} from "utils/pathHelpers";
import truncateString from "utils/truncateString";

const { Option, OptGroup } = AutoComplete;
const { Text } = Typography;

interface Props {
  allCasesStore?: AllCasesStore;
  tagStore?: TagStore;
  allTasksStore?: AllTasksStore;
  indicatorStore?: IndicatorStore;
}

interface State {
  searchValue: string;
}

export default inject(
  "allCasesStore",
  "tagStore",
  "allTasksStore",
  "indicatorStore"
)(
  observer(
    class GlobalAutocomplete extends React.Component<Props, State> {
      state = {
        searchValue: ""
      };

      componentDidMount() {
        const {
          allCasesStore,
          allTasksStore,
          tagStore,
          indicatorStore
        } = this.props;

        allCasesStore!.loadCases();
        allTasksStore!.loadTasks();
        indicatorStore!.loadIndicators();
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
              {truncateString(theCase.name, 22)}
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
              {truncateString(tag.name, 30)}
            </Option>
          ));
        }

        // indicator options
        const { indicatorStore } = this.props;

        let indicatorOptions: Object[];

        if (indicatorStore!.indicatorsAreLoading) {
          indicatorOptions = [
            <Option disabled key="loading" value="loading">
              Loading...
            </Option>
          ];
        } else {
          indicatorOptions = indicatorStore!.indicators.map(indicator => (
            <Option
              key={`${indicator.case.id}-${indicator.id}`}
              value={indicator.name}
              title="INDICATOR"
            >
              {truncateString(indicator.name, 22)}
              <span style={{ position: "absolute", right: "16px" }}>
                <Text type="secondary">
                  {truncateString(indicator.case.name, 15)}
                </Text>
              </span>
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
            <Option
              key={`${task.case.id}-${task.id}`}
              value={task.name}
              title="TASK"
            >
              {truncateString(task.name, 22)}
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
            open={this.state.searchValue !== ""}
            onSelect={(value, option: any) => {
              this.setState({ searchValue: "" });

              // the clicked option's type
              const type = option.props.title;

              // clicked on an actual option
              if (type === "CASE") {
                const caseId = option.key;

                // open the chosen case
                navigate(getPathToACase(caseId));
              } else if (type === "TASK") {
                // the key is formatted case ID-task ID

                // extract the case ID and task ID
                const caseId = option.key.split("-")[0];
                const taskId = option.key.split("-")[1];

                // and then open the chosen task
                navigate(getPathToATask(caseId, taskId));
              } else if (type === "INDICATOR") {
                // the key is formatted case ID-indicator ID

                // extract the case ID and indicator ID
                const caseId = option.key.split("-")[0];
                const indicatorId = option.key.split("-")[1];

                // and then open the chosen indicator
                navigate(getPathToAnIndicator(caseId, indicatorId));
              }
            }}
            optionLabelProp="value"
            dropdownStyle={{ width: "350px" }}
            filterOption={(inputValue, option) => {
              // filter options based on the name of the task/tag/indicator/case
              if (option.props.value) {
                // always show the "View all results" option
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
                disabled
                key={VIEW_ALL_RESULTS}
                value={VIEW_ALL_RESULTS}
                style={{
                  cursor: "default",
                  lineHeight: 2
                }}
              >
                <a onClick={() => navigate(paths.SEARCH_PATH)}>
                  View all results
                </a>
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
                key="Tasks"
                label={
                  <span>
                    Tasks
                    <a style={{ float: "right" }}>More</a>
                  </span>
                }
              >
                {taskOptions}
              </OptGroup>,
              <OptGroup
                key="Indicators"
                label={
                  <span>
                    Indicators
                    <a style={{ float: "right" }}>More</a>
                  </span>
                }
              >
                {indicatorOptions}
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
