import { useQuery } from "@apollo/react-hooks";
import { navigate } from "@reach/router";
import { AutoComplete, Input, Typography } from "antd";
import GET_CASES from "queries/getCases";
import { OptGroup } from "rc-select";
import React, { useState } from "react";
import ICase from "ts/interfaces/ICase";
import { paths, VIEW_ALL_RESULTS } from "utils/constants";
import { formatDateOnly } from "utils/formatISO8601";
import {
  getPathToACase,
  getPathToAnIndicator,
  getPathToATask
} from "utils/pathHelpers";
import truncateString from "utils/truncateString";

const { Text } = Typography;
const { Option } = AutoComplete;

interface AllCasesResponse {
  cases: ICase[];
}

function GlobalAutocomplete() {
  const [searchValue, setSearchValue] = useState<string>("");

  // repeat for indicators, tasks
  const { data: allCasesData, loading: allCasesLoading } = useQuery<
    AllCasesResponse
  >(GET_CASES);

  // case options
  let caseOptions: Object[] = [];

  if (allCasesLoading) {
    caseOptions = [
      <Option disabled key="loading" value="loading">
        Loading...
      </Option>
    ];
  } else if (allCasesData) {
    caseOptions = allCasesData.cases.map(theCase => (
      <Option key={theCase.id} value={theCase.name} title="CASE">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>{truncateString(theCase.name, 50)}</div>
          <div>
            <Text type="secondary">{formatDateOnly(theCase.createdAt)}</Text>
          </div>
        </div>
      </Option>
    ));
  }

  let indicatorOptions: Object[] = [];

  // if (indicatorStore!.indicatorsAreLoading) {
  //   indicatorOptions = [
  //     <Option disabled key="loading" value="loading">
  //       Loading...
  //     </Option>
  //   ];
  // } else {
  //   indicatorOptions = indicatorStore!.indicators.map(indicator => (
  //     <Option
  //       key={`${indicator.case.id}-${indicator.id}`}
  //       value={indicator.name}
  //       title="INDICATOR"
  //     >
  //       {truncateString(indicator.name, 22)}
  //       <span style={{ position: "absolute", right: "16px" }}>
  //         <Text type="secondary">
  //           {truncateString(indicator.case.name, 15)}
  //         </Text>
  //       </span>
  //     </Option>
  //   ));
  // }

  let taskOptions: Object[] = [];

  // if (allTasksStore!.tasksAreLoading) {
  //   taskOptions = [
  //     <Option disabled key="loading" value="loading">
  //       Loading...
  //     </Option>
  //   ];
  // } else {
  //   taskOptions = allTasksStore!.tasks.map(task => (
  //     <Option key={`${task.case.id}-${task.id}`} value={task.name} title="TASK">
  //       {truncateString(task.name, 22)}
  //       <span style={{ position: "absolute", right: "16px" }}>
  //         <Text type="secondary">{truncateString(task.case.name, 15)}</Text>
  //       </span>
  //     </Option>
  //   ));
  // }

  return (
    <AutoComplete
      value={searchValue}
      defaultActiveFirstOption={true}
      dropdownMatchSelectWidth={500}
      style={{ width: 250 }}
      onChange={(value: any) => setSearchValue(value)}
      open={searchValue !== ""}
      onSelect={(value, option: any) => {
        setSearchValue("");

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
      filterOption={(inputValue, option) => {
        if (!option) return false;
        // filter options based on the name of the task/indicator/case
        if (option.value) {
          // change to true to always show View all Results
          if (option.value === VIEW_ALL_RESULTS) return true;
          else {
            return (
              option.value
                .toString()
                .toLowerCase()
                .indexOf(inputValue.toLowerCase()) !== -1
            );
          }
        }
        return false;
      }}
      dataSource={
        [
          <Option
            disabled
            key={VIEW_ALL_RESULTS}
            value={VIEW_ALL_RESULTS}
            style={{
              cursor: "default",
              lineHeight: 2
            }}
          >
            <a onClick={() => navigate(paths.SEARCH_PATH)}>View all results</a>
          </Option>,
          <OptGroup key="Cases" label="Cases">
            {caseOptions}
          </OptGroup>,
          <OptGroup key="Tasks" label="Tasks">
            {taskOptions}
          </OptGroup>,
          <OptGroup key="Indicators" label="Indicators">
            {indicatorOptions}
          </OptGroup>
        ] as any
      }
    >
      <Input.Search allowClear placeholder="Search" />
    </AutoComplete>
  );
}

export default GlobalAutocomplete;
