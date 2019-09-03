import { Avatar, Comment, List } from "antd";
import React from "react";
import IComment from "ts/interfaces/IComment";
import formatISO8601 from "utils/formatISO8601";
import DeleteCommentButtonP from "./DeleteCommentButtonP";

interface CommentListProps {
  comments: IComment[];
}

const CommentListP: React.FC<CommentListProps> = ({ comments }) => (
  <List
    className="comment-list"
    itemLayout="horizontal"
    dataSource={comments}
    renderItem={comment => (
      <li>
        <Comment
          content={comment.comment}
          author={comment.createdBy.username}
          datetime={`${formatISO8601(comment.createdAt)} UTC`}
          avatar={<Avatar icon="user" />}
          actions={[<DeleteCommentButtonP />]}
        />
      </li>
    )}
  />
);

export default CommentListP;
