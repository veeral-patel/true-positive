import { Avatar, Button, Comment, List } from "antd";
import React from "react";
import IComment from "ts/interfaces/IComment";
import formatISO8601 from "utils/formatISO8601";

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
          actions={[
            <Button
              type="link"
              style={{ color: "red", padding: 0, margin: 0 }}
              icon="delete"
            />
          ]}
        />
      </li>
    )}
  />
);

export default CommentListP;
