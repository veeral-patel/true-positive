import { AutoComplete, Form, Icon, Input, Modal, Select } from "antd";
import "container/all_cases/CreateCaseModalP.css";
import { inject, observer } from "mobx-react";
import React from "react";
import PriorityStore from "stores/PriorityStore";
import StatusStore from "stores/StatusStore";
import UIStore from "stores/UIStore";

const { Option } = Select;

interface Props {
  uiStore?: UIStore;
  statusStore?: StatusStore;
  priorityStore?: PriorityStore;
}

export default inject("uiStore", "statusStore", "priorityStore")(
  observer(
    class CreateCaseModal extends React.Component<Props> {
      componentDidMount() {
        const { statusStore, priorityStore } = this.props;
        statusStore!.loadStatuses();
        priorityStore!.loadPriorities();
      }

      render() {
        const { uiStore, statusStore, priorityStore } = this.props;

        const statusOptions = statusStore!.statuses.map(status => (
          <Option key={status.id}>{status.name}</Option>
        ));

        const priorityOptions = priorityStore!.priorities.map(priority => (
          <Option key={priority.id}>{priority.name}</Option>
        ));

        return (
          <Modal
            visible={uiStore!.openModal === "CREATE_CASE_MODAL"}
            title="Create a Case"
            onOk={() => uiStore!.closeModal()}
            onCancel={() => uiStore!.closeModal()}
            okText="Create Case"
            style={{ padding: "0px" }}
            destroyOnClose={true}
          >
            <Form colon={false}>
              <Form.Item label="Name" required>
                <Input
                  placeholder="Found Ryuk"
                  ref={input => input && input.focus()}
                />
              </Form.Item>
              <Form.Item label="Status" required>
                <AutoComplete
                  dataSource={statusOptions}
                  placeholder="Choose a status"
                >
                  <Input
                    suffix={<Icon type="down" style={{ color: "gray" }} />}
                  />
                </AutoComplete>
              </Form.Item>
              <Form.Item label="Priority" required>
                <AutoComplete
                  dataSource={priorityOptions}
                  placeholder="Choose a priority"
                >
                  <Input
                    suffix={<Icon type="down" style={{ color: "gray" }} />}
                  />
                </AutoComplete>
              </Form.Item>
            </Form>
          </Modal>
        );
      }
    }
  )
);
