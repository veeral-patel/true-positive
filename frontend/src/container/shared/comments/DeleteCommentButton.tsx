import { DeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
import { inject, observer } from "mobx-react";
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
          <Popconfirm
            title="Delete this comment?"
            okText="Yes, Delete"
            onConfirm={() => activeCaseStore!.deleteComment(comment.id)}
            cancelText="No"
          >
            <Button
              type="link"
              icon={<DeleteOutlined />}
              style={{ margin: 0, padding: 0 }}
            />
          </Popconfirm>
        );
      }
    }
  )
);
