import { Popover } from "antd";
import TagSelect from "container/shared/tags/TagSelect";
import ListOfTagsP from "presentational/shared/tags/ListOfTagsP";
import React from "react";
import ITag from "ts/interfaces/ITag";

interface EditableTagListProps {
  existingTags: ITag[];
}

const EditableTagList: React.FC<EditableTagListProps> = ({ existingTags }) => (
  <Popover
    title="Edit Tags"
    content={<TagSelect existingTags={existingTags} />}
  >
    <ListOfTagsP tags={existingTags} />{" "}
  </Popover>
);

export default EditableTagList;
