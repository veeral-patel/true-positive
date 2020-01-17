import { useMutation } from "@apollo/react-hooks";
import {
  Button,
  Form,
  Input,
  message,
  Modal,
  notification,
  Typography
} from "antd";
import { inject, observer } from "mobx-react";
import CREATE_A_TASK_GROUP from "mutations/createTaskGroup";
import React from "react";
import ActiveCaseStore from "stores/ActiveCaseStore";

const { Paragraph } = Typography;

interface Props {
  visible: boolean;
  handleClose: () => void;
  activeCaseStore?: ActiveCaseStore;
}

function CreateTaskGroupModal({
  visible,
  handleClose,
  activeCaseStore
}: Props) {
  const [createTaskGroup] = useMutation(CREATE_A_TASK_GROUP, {
    onCompleted: () => {
      message.success("Created task group");
      activeCaseStore!.loadActiveCase();
    },
    onError: error => {
      notification.error({
        message: "Failed to create task group",
        description: error.message
      });
    }
  });

  return (
    <Modal
      footer={null}
      destroyOnClose={true}
      visible={visible}
      onCancel={handleClose}
      title="Create a Task Group"
      keyboard={false}
    >
      <Paragraph>
        Categorize your tasks using task groups. For example, you might create
        groups called "Triage", "Containment", and "Remediation".
      </Paragraph>
      <Form
        layout="vertical"
        colon={false}
        onFinish={values =>
          activeCaseStore!.activeCase &&
          createTaskGroup({
            variables: {
              input: {
                name: values.name,
                caseId: activeCaseStore!.activeCase.id
              }
            }
          })
        }
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please name your task group" }]}
        >
          <Input placeholder="Containment" autoFocus />
        </Form.Item>
        <Form.Item>
          <div style={{ float: "right" }}>
            <Button style={{ marginRight: "0.5em" }} onClick={handleClose}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default inject("activeCaseStore")(observer(CreateTaskGroupModal));
