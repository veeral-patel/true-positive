import { Comment, List } from "antd";
import React from "react";
import IComment from "ts/interfaces/IComment";

interface CommentListProps {
  comments: IComment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => (
  <List
    className="comment-list"
    itemLayout="horizontal"
    dataSource={comments}
    renderItem={comment => (
      <li>
        <Comment
          content={comment.comment}
          author={comment.createdBy.username}
          datetime={comment.formattedCreatedAt}
        />
      </li>
    )}
  />
);

export default CommentList;
