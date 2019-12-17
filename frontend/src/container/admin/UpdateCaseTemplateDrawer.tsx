import { Drawer } from "antd";
import CaseTemplateForm from "container/admin/CaseTemplateForm";
import React from "react";

interface Props {
  visible: boolean;
  handleClose: () => void;
}

function UpdateCaseTemplateDrawer({ visible, handleClose }: Props) {
  return (
    <Drawer
      visible={visible}
      title={<h3>Update a case template</h3>}
      width={600}
      maskClosable={false}
      keyboard={false}
      onClose={handleClose}
    >
      <CaseTemplateForm handleClose={handleClose} submitText="Update Template" />
    </Drawer>
  );
}

export default UpdateCaseTemplateDrawer;
