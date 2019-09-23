import { Button, Modal, Steps } from "antd";
import React from "react";

const { Step } = Steps;

interface Props {
  /* whether this modal is open. */
  visible: boolean;

  /* function to execute when user wants to close this modal */
  handleClose: () => void;
}

interface State {
  /* the step our wizard is in. 0 = choose file, 1 = add indicators */
  currentStep: 0 | 1;
}

class ImportIndicatorsFromCSVModal extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      currentStep: 0
    };
  }

  render() {
    const { visible, handleClose } = this.props;
    const { currentStep } = this.state;

    return (
      <Modal
        title="Import indicators from a CSV"
        visible={visible}
        onCancel={() => handleClose()}
        footer={null}
      >
        <div>
          <Steps size="small" current={currentStep}>
            <Step title="Choose file" />
            <Step title="Add indicators" />
          </Steps>
          <div className="steps-content" style={{ marginTop: "1.5em" }}>
            Content here
          </div>
          <div className="steps-action" style={{ marginTop: "1em" }}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button style={{ marginRight: "0.5em" }}>Cancel</Button>
              <Button type="primary">Next</Button>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

export default ImportIndicatorsFromCSVModal;
