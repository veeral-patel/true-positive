import { AutoComplete, Icon, Input } from "antd";
import React from "react";
import ICase from "ts/interfaces/ICase";
import { formatDateOnly } from "utils/formatISO8601";
const { Option } = AutoComplete;

interface CaseAutocompleteProps {
  cases: ICase[];
}

const CaseAutocompleteP: React.FC<CaseAutocompleteProps> = ({ cases }) => {
  const options = cases.map(thecase => (
    <Option key={thecase.id}>
      {thecase.name}
      <span style={{ position: "absolute", right: "16px" }}>
        Created {formatDateOnly(thecase.createdAt)}
      </span>
    </Option>
  ));

  return (
    <AutoComplete dataSource={options} style={{ width: "100%" }}>
      <Input prefix={<Icon type="search" />} placeholder="Filter cases" />
    </AutoComplete>
  );
};

export default CaseAutocompleteP;
