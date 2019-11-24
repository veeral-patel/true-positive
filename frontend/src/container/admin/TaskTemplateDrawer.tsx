import { Drawer } from "antd";
import React from "react";

interface Props {
  /* Whether to render this drawer. */
  isOpen: boolean;

  /* Callback to close this drawer. */
  handleClose: () => void;

  /* ID of the task template to show. */
  templateId: number | null;
}

function TaskTemplateDrawer(props: Props) {
  const { isOpen, handleClose, templateId } = props;

  /* can't render the drawer without knowing which template you're editing! */
  if (templateId == null) return null;

  return (
    <Drawer visible={isOpen} onClose={handleClose}>
      Hello world!
    </Drawer>
  );
}

export default TaskTemplateDrawer;
