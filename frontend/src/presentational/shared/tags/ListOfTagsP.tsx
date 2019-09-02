import { Tag } from "antd";
import "presentational/shared/tags/ListOfTagsP.css";
import React from "react";
import ITag from "ts/interfaces/ITag";

interface IListOfTagsProps {
  tags: ITag[];
}

const ListOfTagsP: React.FC<IListOfTagsProps> = ({ tags }) => (
  <span>
    {tags.map((tag: ITag) => (
      <Tag color="blue" key={tag.id}>
        {tag.name}
      </Tag>
    ))}
  </span>
);

export default ListOfTagsP;
