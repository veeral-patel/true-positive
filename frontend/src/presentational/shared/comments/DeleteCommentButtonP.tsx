import { Button } from "antd";
import React from "react";

const DeleteCommentButtonP: React.FC = () => (
  <Button
    type="link"
    icon="delete"
    style={{ color: "red", margin: 0, padding: 0 }}
  >
    Delete
  </Button>
);

export default DeleteCommentButtonP;
