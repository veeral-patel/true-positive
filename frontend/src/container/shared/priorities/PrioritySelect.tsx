import { Empty, Select, Spin } from "antd";
import { observer } from "mobx-react";
import { useQuery } from "models";
import React from "react";

const { Option } = Select;

const PrioritySelect = observer(() => {
  // fetch the list of priorities
  const { data, loading, error } = useQuery(store => store.queryPriorities());

  // handle loading and error statuses
  if (loading) return <Spin />;
  if (error || !data) return <Empty />;

  // generate a list of options
  const options = data.priorities.map(priority => (
    <Option key={priority.id}>{priority.name}</Option>
  ));

  // render our component
  return (
    <Select
      showSearch
      placeholder="Choose a priority"
      style={{ minWidth: "200px" }}
    >
      {options}
    </Select>
  );
});

export default PrioritySelect;
