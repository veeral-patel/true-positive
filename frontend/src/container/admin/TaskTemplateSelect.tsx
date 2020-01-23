import { useQuery } from "@apollo/react-hooks";
import { Select } from "antd";
import GET_TASK_TEMPLATES from "queries/getTaskTemplates";
import React from "react";
import ITaskTemplate from "ts/interfaces/ITaskTemplate";

const { Option } = Select;

interface TaskTemplateData {
  taskTemplates: ITaskTemplate[];
}

interface Props {
  placeholder: string;
}

function TaskTemplateSelect({ placeholder }: Props) {
  const { loading, data } = useQuery<TaskTemplateData>(GET_TASK_TEMPLATES);

  var options: Object[] = [];
  if (loading) {
    options = [
      <Option key="loading" value="loading">
        Loading...
      </Option>
    ];
  } else if (data) {
    options = data.taskTemplates.map(taskTemplate => (
      <Option key={taskTemplate.id} value={taskTemplate.id}>
        {taskTemplate.name}
      </Option>
    ));
  } else {
    options = [
      <Option key="error" value="error">
        Error loading task templates
      </Option>
    ];
  }

  return (
    <Select
      placeholder={placeholder}
      mode="multiple"
      style={{ width: "100%" }}
      optionFilterProp="children"
    >
      {options}
    </Select>
  );
}

export default TaskTemplateSelect;
