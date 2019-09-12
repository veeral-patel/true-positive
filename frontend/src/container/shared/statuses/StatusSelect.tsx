import { Empty, Select, Spin } from "antd";
import { observer } from "mobx-react";
import { useQuery } from "models";
import React from "react";

const { Option } = Select;

const StatusSelect = observer(() => {
  // fetch the list of statuses
  const { data, loading, error } = useQuery(store => store.queryStatuses());

  // handle loading and error statuses
  if (loading) return <Spin />;
  if (error || !data) return <Empty />;

  // generate a list of options
  const options = data.statuses.map(status => (
    <Option key={status.id}>{status.name}</Option>
  ));

  // render our component
  return (
    <Select
      showSearch
      placeholder="Choose a status"
      style={{ minWidth: "200px" }}
    >
      {options}
    </Select>
  );
});

export default StatusSelect;
