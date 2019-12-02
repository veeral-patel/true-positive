import { Avatar, Button, Comment } from "antd";
import DeleteCommentButton from "container/shared/comments/DeleteCommentButton";
import converter from "container/shared/markdown/converter";
import { MdePreview } from "container/shared/markdown/MdePreview";
import EditCommentForm from "presentational/shared/comments/EditCommentForm";
import React from "react";
import IComment from "ts/interfaces/IComment";
import getUsernameOfCurrentUser from "utils/currentUser";
import formatISO8601 from "utils/formatISO8601";

interface Props {
  comment: IComment;
}

interface State {
  editing: boolean;
}

class AComment extends React.Component<Props, State> {
  state = {
    editing: false
  };

  render() {
    const usernameOfCurrentUser = getUsernameOfCurrentUser();
    const { comment } = this.props;
    const { editing } = this.state;

    return (
      <Comment
        content={
          editing ? (
            <EditCommentForm
              initialComment={comment.comment}
              commentId={comment.id}
              handleCancel={() => this.setState({ editing: false })}
            />
          ) : (
            <MdePreview
              markdown={comment.comment}
              generateMarkdownPreview={markdown =>
                Promise.resolve(converter.makeHtml(markdown))
              }
            />
          )
        }
        author={comment.createdBy.username}
        datetime={`${formatISO8601(comment.createdAt)} UTC`}
        avatar={<Avatar icon="user" />}
        actions={[
          !editing && usernameOfCurrentUser === comment.createdBy.username && (
            <span>
              <DeleteCommentButton comment={comment} />
              <Button
                type="link"
                icon="edit"
                onClick={() => this.setState({ editing: true })}
              />
            </span>
          )
        ]}
      />
    );
  }
}

export default AComment;
