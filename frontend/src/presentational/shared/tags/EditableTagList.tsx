import { Popover } from "antd";
import ListOfTagsP from "presentational/shared/tags/ListOfTagsP";
import React from "react";
import ITag from "ts/interfaces/ITag";
import TagSelectP from "./TagSelectP";

interface EditableTagListProps {
  existingTags: ITag[];
}

const EditableTagList: React.FC<EditableTagListProps> = ({ existingTags }) => (
  <Popover
    title="Edit Tags"
    content={<TagSelectP existingTags={existingTags} />}
  >
    <ListOfTagsP tags={existingTags} />{" "}
  </Popover>
);

export default EditableTagList;
