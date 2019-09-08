import { Avatar, Button, Comment } from "antd";
import DeleteCommentButton from "container/shared/comments/DeleteCommentButton";
import NewCommentP from "presentational/shared/comments/NewCommentP";
import React from "react";
import IComment from "ts/interfaces/IComment";
import formatISO8601 from "utils/formatISO8601";

interface EditableCommentProps {
  comment: IComment;
}

interface EditableCommentState {
  editing: boolean;
}

class EditableCommentP extends React.Component<
  EditableCommentProps,
  EditableCommentState
> {
  state = {
    editing: false
  };

  render() {
    const { comment } = this.props;
    const { editing } = this.state;

    return editing ? (
      <NewCommentP />
    ) : (
      <Comment
        content={comment.comment}
        author={comment.createdBy.username}
        datetime={`${formatISO8601(comment.createdAt)} UTC`}
        avatar={<Avatar icon="user" />}
        actions={[
          <DeleteCommentButton comment={comment} />,
          <Button
            type="link"
            icon="edit"
            onClick={() => this.setState({ editing: true })}
          />
        ]}
      />
    );
  }
}

export default EditableCommentP;
