import { Drawer } from "antd";
import React from "react";

interface Props {
  visible: boolean;
  onClose: () => void;
  groupId: number | null;
}

function GroupDrawer({ visible, onClose, groupId }: Props) {
  return <Drawer visible={visible} onClose={onClose} width={600} />;
}

export default GroupDrawer;
