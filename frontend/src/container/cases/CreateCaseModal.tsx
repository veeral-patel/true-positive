import { inject, observer } from "mobx-react";
import CreateCaseModalP from "presentational/cases/CreateCaseModalP";
import React from "react";
import StatusStore from "stores/StatusStore";
import UIStore from "stores/UIStore";

interface ICreateCaseModalProps {
  uiStore?: UIStore;
  statusStore?: StatusStore;
}

export default inject("uiStore", "statusStore")(
  observer(
    class CreateCaseModal extends React.Component<ICreateCaseModalProps> {
      componentDidMount() {
        const { statusStore } = this.props;
        statusStore!.loadStatuses();
      }

      render() {
        const { uiStore, statusStore } = this.props;
        return (
          <CreateCaseModalP
            visible={uiStore!.openModal === "CREATE_CASE_MODAL"}
            handleOk={() => uiStore!.closeModal()}
            handleCancel={() => uiStore!.closeModal()}
            statuses={statusStore!.statuses}
          />
        );
      }
    }
  )
);
