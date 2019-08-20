import { Modal } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import UIStore from "stores/UIStore";

interface IAddTagsModalProps {
  uiStore?: UIStore;
}

export default inject("uiStore")(
  observer(
    class AddTagsModal extends React.Component<IAddTagsModalProps> {
      render() {
        const { uiStore } = this.props;
        return (
          <Modal
            title="Hello"
            visible={uiStore!.openModal === "ADD_TAGS_TO_CASE_MODAL"}
          />
        );
      }
    }
  )
);
