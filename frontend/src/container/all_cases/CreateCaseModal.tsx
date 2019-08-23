import { inject, observer } from "mobx-react";
import CreateCaseModalP from "presentational/cases/CreateCaseModalP";
import React from "react";
import PriorityStore from "stores/PriorityStore";
import StatusStore from "stores/StatusStore";
import UIStore from "stores/UIStore";

interface ICreateCaseModalProps {
  uiStore?: UIStore;
  statusStore?: StatusStore;
  priorityStore?: PriorityStore;
}

export default inject("uiStore", "statusStore", "priorityStore")(
  observer(
    class CreateCaseModal extends React.Component<ICreateCaseModalProps> {
      componentDidMount() {
        const { statusStore, priorityStore } = this.props;
        statusStore!.loadStatuses();
        priorityStore!.loadPriorities();
      }

      render() {
        const { uiStore, statusStore, priorityStore } = this.props;
        return (
          <CreateCaseModalP
            visible={uiStore!.openModal === "CREATE_CASE_MODAL"}
            handleOk={() => uiStore!.closeModal()}
            handleCancel={() => uiStore!.closeModal()}
            statuses={statusStore!.statuses}
            priorities={priorityStore!.priorities}
          />
        );
      }
    }
  )
);
