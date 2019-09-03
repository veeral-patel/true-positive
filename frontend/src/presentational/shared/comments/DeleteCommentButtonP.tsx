import { Button, Popconfirm } from "antd";
import React from "react";

interface DeleteCommentProps {
  deleteComment: () => void;
}

const DeleteCommentButtonP: React.FC<DeleteCommentProps> = ({
  deleteComment
}) => (
  <Popconfirm
    title="Delete this comment?"
    okText="Yes, Delete"
    onConfirm={() => deleteComment()}
    cancelText="No"
  >
    <Button type="link" icon="delete" style={{ margin: 0, padding: 0 }} />
  </Popconfirm>
);

export default DeleteCommentButtonP;
