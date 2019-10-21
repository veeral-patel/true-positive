import { AutoComplete, Icon, Input } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import AllCasesStore from "stores/AllCasesStore";
import AllTasksStore from "stores/AllTasksStore";
import TagStore from "stores/TagStore";

const { Option, OptGroup } = AutoComplete;

interface Props {
  allCasesStore?: AllCasesStore;
  tagStore?: TagStore;
  allTasksStore?: AllTasksStore;
}

export default inject("allCasesStore", "tagStore", "allTasksStore")(
  observer(
    class GlobalAutocomplete extends React.Component<Props> {
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
            <Option key={theCase.id} value={theCase.name}>
              {theCase.name}
            </Option>
          ));

          // show only first 3 matches
          if (caseOptions.length > 3) caseOptions = caseOptions.slice(0, 3);
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

          // show only first 3 matches
          if (tagOptions.length > 3) tagOptions = tagOptions.slice(0, 3);
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
            </Option>
          ));

          // show only first 3 matches
          if (taskOptions.length > 3) taskOptions = taskOptions.slice(0, 3);
        }

        return (
          <AutoComplete
            filterOption={(inputValue, option) => {
              if (option.props.value) {
                return (
                  option.props.value
                    .toString()
                    .toLowerCase()
                    .indexOf(inputValue.toLowerCase()) !== -1
                );
              }
              return false;
            }}
            dataSource={[
              <OptGroup key="Cases" label="Cases">
                {caseOptions}
              </OptGroup>,
              <OptGroup key="Tags" label="Tags">
                {tagOptions}
              </OptGroup>,
              <OptGroup key="Tasks" label="Tasks">
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
