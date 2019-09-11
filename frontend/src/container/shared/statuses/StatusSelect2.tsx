import { Select, Spin } from "antd";
import { observer } from "mobx-react";
import { useQuery } from "models";
import React from "react";

const { Option } = Select;

const StatusSelect2 = observer(() => {
  const { data, loading, error } = useQuery(store => store.queryStatuses());
  if (loading) return <Spin />;
  if (error || !data) return <p>Couldn't load statuses</p>;

  const options = data.statuses.map(status => (
    <Option key={status.id}>{status.name}</Option>
  ));

  return (
    <Select
      showSearch
      placeholder="Choose a status"
      style={{ minWidth: "200px" }}
    ></Select>
  );
});

export default StatusSelect2;
