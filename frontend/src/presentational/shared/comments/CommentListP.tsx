import { Avatar, Button, Comment, List } from "antd";
import DeleteCommentButton from "container/shared/comments/DeleteCommentButton";
import React from "react";
import IComment from "ts/interfaces/IComment";
import getUsernameOfCurrentUser from "utils/currentUser";
import formatISO8601 from "utils/formatISO8601";

interface CommentListProps {
  comments: IComment[];
}

const CommentListP: React.FC<CommentListProps> = ({ comments }) => {
  const usernameOfCurrentUser = getUsernameOfCurrentUser();
  return (
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
              usernameOfCurrentUser === comment.createdBy.username && (
                <span>
                  <Button type="link" icon="edit" />
                  <DeleteCommentButton comment={comment} />
                </span>
              )
            ]}
          />
        </li>
      )}
    />
  );
};

export default CommentListP;
