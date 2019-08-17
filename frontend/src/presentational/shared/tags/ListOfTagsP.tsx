import React from "react";
import { Tag } from "antd";

interface IListOfTagsProps {
  tags: string[];
}

const ListOfTagsP: React.SFC<IListOfTagsProps> = ({ tags }) => (
  <span>
    {tags.map((tag: string) => (
      <Tag color="blue" key={tag}>
        {tag}
      </Tag>
    ))}
  </span>
);

export default ListOfTagsP;
