import { inject, observer } from "mobx-react";
import CreateCaseModalP from "presentational/cases/CreateCaseModalP";
import React from "react";
import UIStore from "stores/UIStore";

interface ICreateCaseModalProps {
  uiStore?: UIStore;
}

export default inject("uiStore")(
  observer(
    class CreateCaseModal extends React.Component<ICreateCaseModalProps> {
      render() {
        const { uiStore } = this.props;
        return (
          <CreateCaseModalP
            visible={uiStore!.openModal === "CREATE_CASE_MODAL"}
            handleOk={() => uiStore!.closeModal()}
            handleCancel={() => uiStore!.closeModal()}
          />
        );
      }
    }
  )
);
