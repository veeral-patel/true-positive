import { Modal } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import UIStore from "stores/UIStore";

interface ModalProps {
  visible: boolean;
  uiStore?: UIStore;
}

export default inject("uiStore")(
  observer(
    class CreateTaskModal extends React.Component<ModalProps> {
      render() {
        const { visible, uiStore } = this.props;
        return (
          <Modal
            visible={visible}
            title="Create a Task"
            footer={null}
            onCancel={() => uiStore!.closeModal()}
          ></Modal>
        );
      }
    }
  )
);
