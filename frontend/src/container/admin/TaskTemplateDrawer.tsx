import { Drawer } from "antd";
import React from "react";

interface Props {
  /* Whether to render this drawer. */
  isOpen: boolean;
}

function TaskTemplateDrawer(props: Props) {
  const { isOpen } = props;
  return <Drawer visible={isOpen}>Hello world!</Drawer>;
}

export default TaskTemplateDrawer;
