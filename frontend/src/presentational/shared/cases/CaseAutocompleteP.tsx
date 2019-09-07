import { AutoComplete, Icon, Input } from "antd";
import React from "react";
import ICase from "ts/interfaces/ICase";
const { Option } = AutoComplete;

interface CaseAutocompleteProps {
  cases: ICase[];
}

const CaseAutocompleteP: React.FC<CaseAutocompleteProps> = ({ cases }) => {
  const options = cases.map(thecase => (
    <Option key={thecase.id}>{thecase.name}</Option>
  ));

  return (
    <AutoComplete dataSource={options} style={{ width: "100%" }}>
      <Input prefix={<Icon type="search" />} placeholder="Filter cases" />
    </AutoComplete>
  );
};

export default CaseAutocompleteP;
