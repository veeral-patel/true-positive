import { Tag } from "antd";
// sets bottom margin for tags
import "presentational/shared/tags/ListOfTagsP.css";
import React from "react";
import ITag from "ts/interfaces/ITag";

interface IListOfTagsProps {
  tags: ITag[];

  /* the max number of tags to render */
  limit?: number;
}

const ListOfTagsP: React.FC<IListOfTagsProps> = ({ tags, limit }) => {
  // if the caller specified a limit, obey it
  var tagsToRender = tags;
  if (limit) tagsToRender = tags.filter((tag, index) => index < limit);

  return (
    <span>
      {tagsToRender.map((tag: ITag) => (
        <Tag color="blue" key={tag.id}>
          {tag.name}
        </Tag>
      ))}

      {/* indicate the number of un-displayed tags, if the caller imposed a limit on the # of tags */}
      {limit && tags.length - limit >= 1 && (
        <span style={{ color: "#bfbfbf" }}>{tags.length - limit} more</span>
      )}
    </span>
  );
};

export default ListOfTagsP;
