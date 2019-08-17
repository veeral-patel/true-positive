import { Tag } from "antd";
import React from "react";

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
