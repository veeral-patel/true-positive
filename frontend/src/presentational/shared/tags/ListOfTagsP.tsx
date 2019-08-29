import { Tag } from "antd";
import "presentational/shared/tags/ListOfTagsP.css";
import React from "react";

interface IListOfTagsProps {
  tags: string[];
}

const ListOfTagsP: React.FC<IListOfTagsProps> = ({ tags }) => (
  <span>
    {tags.map((tag: string) => (
      <Tag color="blue" key={tag}>
        {tag}
      </Tag>
    ))}
  </span>
);

export default ListOfTagsP;
