import { Button } from "antd";
import React from "react";

interface DeleteCommentProps {
  handleClick: (event: React.MouseEvent) => void;
}

const DeleteCommentButtonP: React.FC<DeleteCommentProps> = ({
  handleClick
}) => (
  <Button
    type="link"
    icon="delete"
    style={{ margin: 0, padding: 0 }}
    onClick={handleClick}
  ></Button>
);

export default DeleteCommentButtonP;
