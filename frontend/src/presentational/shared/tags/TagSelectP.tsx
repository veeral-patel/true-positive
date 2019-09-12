import { Select } from "antd";
import React from "react";
import ITag from "ts/interfaces/ITag";

const { Option } = Select;

interface TagSelectProps {
  existingTags: ITag[];
}

const TagSelectP: React.FC<TagSelectProps> = ({ existingTags }) => {
  return (
    <Select
      mode="tags"
      placeholder="Select tags"
      defaultValue={existingTags.map(tag => tag.name)}
      style={{ minWidth: "200px" }}
    />
  );
};

export default TagSelectP;
