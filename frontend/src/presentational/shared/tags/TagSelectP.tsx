import { Select } from "antd";
import React from "react";
import ITag from "ts/interfaces/ITag";

const { Option } = Select;

interface TagSelectProps {
  tags: ITag[];
}

const TagSelectP: React.FC<TagSelectProps> = ({ tags }) => {
  const options = tags.map(tag => <Option key={tag.id}>{tag.name}</Option>);
  return (
    <Select mode="tags" placeholder="Select tags" style={{ minWidth: "200px" }}>
      {options}
    </Select>
  );
};

export default TagSelectP;
