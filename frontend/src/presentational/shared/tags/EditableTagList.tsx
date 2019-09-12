import { Popover } from "antd";
import ListOfTagsP from "presentational/shared/tags/ListOfTagsP";
import React from "react";
import ITag from "ts/interfaces/ITag";
import TagSelectP from "./TagSelectP";

interface EditableTagListProps {
  tags: ITag[];
}

const EditableTagList: React.FC<EditableTagListProps> = ({ tags }) => (
  <Popover title="Edit Tags" content={<TagSelectP tags={tags} />}>
    <ListOfTagsP tags={tags} />{" "}
  </Popover>
);

export default EditableTagList;
