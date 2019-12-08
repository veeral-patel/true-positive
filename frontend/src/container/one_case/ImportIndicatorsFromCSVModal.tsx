import { UploadOutlined } from "@ant-design/icons";
import { Button, Modal, Steps, Typography, Upload } from "antd";
import React from "react";

const { Step } = Steps;
const { Dragger } = Upload;
const { Paragraph } = Typography;

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
        onCancel={() => {
          this.setState({ currentStep: 0 });
          handleClose();
        }}
        footer={null}
      >
        <div>
          <Steps size="small" current={currentStep}>
            <Step title="Choose file" />
            <Step title="Add indicators" />
          </Steps>
          <div className="steps-content" style={{ marginTop: "1.5em" }}>
            {currentStep === 0 ? (
              <div>
                <Paragraph>
                  If you have multiple columns in your CSV, this tool will
                  extract indicators from all of them.
                </Paragraph>
                <Dragger>
                  <p className="ant-upload-drag-icon">
                    <UploadOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Drag a CSV into this area to upload
                  </p>
                  <p className="ant-upload-hint">Or click to select the file</p>
                </Dragger>
              </div>
            ) : null}
          </div>
          <div className="steps-action" style={{ marginTop: "1em" }}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button style={{ marginRight: "0.5em" }}>Cancel</Button>
              {currentStep === 0 && (
                <Button
                  type="primary"
                  onClick={() => this.setState({ currentStep: 1 })}
                >
                  Next
                </Button>
              )}
              {currentStep === 1 && (
                <Button type="primary">Add indicators</Button>
              )}
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

export default ImportIndicatorsFromCSVModal;
