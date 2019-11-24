import { Drawer } from "antd";
import React from "react";

interface Props {
  /* Whether to render this drawer. */
  isOpen: boolean;

  /* Callback to close this drawer. */
  handleClose: () => void;
}

function TaskTemplateDrawer(props: Props) {
  const { isOpen, handleClose } = props;
  return (
    <Drawer visible={isOpen} onClose={handleClose}>
      Hello world!
    </Drawer>
  );
}

export default TaskTemplateDrawer;
