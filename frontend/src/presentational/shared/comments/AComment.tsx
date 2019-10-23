import { Avatar, Button, Comment, Input } from "antd";
import DeleteCommentButton from "container/shared/comments/DeleteCommentButton";
import React from "react";
import IComment from "ts/interfaces/IComment";
import getUsernameOfCurrentUser from "utils/currentUser";
import formatISO8601 from "utils/formatISO8601";

const { TextArea } = Input;

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
            <div>
              <TextArea
                defaultValue={comment.comment}
                style={{ paddingTop: "2%" }}
              />
              <div style={{ marginTop: "1em" }}>
                <Button
                  type="link"
                  onClick={() => this.setState({ editing: false })}
                >
                  Cancel
                </Button>
                <Button>Update</Button>
              </div>
            </div>
          ) : (
            comment.comment
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
