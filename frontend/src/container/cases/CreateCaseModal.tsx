import { Modal } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import UIStore from "stores/UIStore";
import CreateCaseForm from "../../presentational/cases/CreateCaseForm";

interface ICreateCaseModalProps {
  uiStore?: UIStore;
}

export default inject("uiStore")(
  observer(
    class CreateCaseModal extends React.Component<ICreateCaseModalProps> {
      render() {
        const { uiStore } = this.props;
        return (
          <Modal
            visible={uiStore!.openModal === "CREATE_CASE_MODAL"}
            title="Create a Case"
            onOk={() => uiStore!.closeModal()}
            onCancel={() => uiStore!.closeModal()}
            okText="Create Case"
          >
            <CreateCaseForm />
          </Modal>
        );
      }
    }
  )
);
