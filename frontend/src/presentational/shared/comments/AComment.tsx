import { Avatar, Comment } from "antd";
import DeleteCommentButton from "container/shared/comments/DeleteCommentButton";
import React from "react";
import IComment from "ts/interfaces/IComment";
import getUsernameOfCurrentUser from "utils/currentUser";
import formatISO8601 from "utils/formatISO8601";

interface Props {
  comment: IComment;
}

class AComment extends React.Component<Props> {
  render() {
    const usernameOfCurrentUser = getUsernameOfCurrentUser();
    const { comment } = this.props;

    return (
      <Comment
        content={comment.comment}
        author={comment.createdBy.username}
        datetime={`${formatISO8601(comment.createdAt)} UTC`}
        avatar={<Avatar icon="user" />}
        actions={[
          usernameOfCurrentUser === comment.createdBy.username && (
            <DeleteCommentButton comment={comment} />
          )
        ]}
      />
    );
  }
}

export default AComment;
