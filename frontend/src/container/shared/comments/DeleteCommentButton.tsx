import { inject, observer } from "mobx-react";
import DeleteCommentButtonP from "presentational/shared/comments/DeleteCommentButtonP";
import React from "react";
import ActiveCaseStore from "stores/ActiveCaseStore";
import IComment from "ts/interfaces/IComment";

interface DeleteCommentButtonProps {
  activeCaseStore?: ActiveCaseStore;
  comment: IComment;
}

export default inject("activeCaseStore")(
  observer(
    class DeleteCommentButton extends React.Component<
      DeleteCommentButtonProps
    > {
      render() {
        const { activeCaseStore, comment } = this.props;
        return (
          <DeleteCommentButtonP
            deleteComment={() => activeCaseStore!.deleteComment(comment.id)}
          />
        );
      }
    }
  )
);
