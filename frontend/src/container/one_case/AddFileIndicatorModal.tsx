import { Modal } from "antd";
import React from "react";

interface Props {
  visible: boolean;
}

class AddFileIndicatorModal extends React.Component<Props> {
  render() {
    const { visible } = this.props;
    return <Modal title="Add a file indicator" visible={visible}></Modal>;
  }
}

export default AddFileIndicatorModal;
