import { Select } from "antd";
import React, { ReactNode } from "react";
import ITag from "ts/interfaces/ITag";

interface TagSelectProps {
  existingTags: ITag[]; // to pre-populate our tag select
  allTagOptions: ReactNode[];
}

const TagSelectP: React.FC<TagSelectProps> = ({
  existingTags,
  allTagOptions
}) => {
  return (
    <Select
      mode="tags"
      placeholder="Select tags"
      defaultValue={existingTags.map(tag => tag.name)}
      style={{ minWidth: "200px" }}
    >
      {allTagOptions}
    </Select>
  );
};

export default TagSelectP;
