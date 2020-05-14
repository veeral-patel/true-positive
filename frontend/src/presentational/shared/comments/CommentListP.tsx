import { List } from "antd";
import AComment from "presentational/shared/comments/AComment";
import React from "react";
import IComment from "ts/interfaces/IComment";

interface CommentListProps {
  comments: IComment[];
}

const CommentListP: React.FC<CommentListProps> = ({ comments }) => {
  return (
    <List
      className="comment-list"
      itemLayout="horizontal"
      dataSource={comments}
      renderItem={comment => <AComment comment={comment} />}
    />
  );
};

export default CommentListP;
