import { useMutation } from "@apollo/react-hooks";
import { Drawer, message, notification } from "antd";
import CREATE_A_TASK_TEMPLATE from "mutations/createTaskTemplate";
import GET_TASK_TEMPLATES from "queries/getTaskTemplates";
import React from "react";
import TaskTemplateForm from "./TaskTemplateForm";

interface Props {
  visible: boolean;
  onClose: () => void;
}

function CreateTaskTemplateDrawer({ visible, onClose }: Props) {
  const [createTaskTemplate] = useMutation(CREATE_A_TASK_TEMPLATE, {
    onCompleted: () => {
      message.success("Created task template");

      // Close drawer after creating a T.T.
      onClose();
    },
    onError: error => {
      notification.error({
        message: "Failed to create task template",
        description: error.message
      });
    }
  });

  return (
    <Drawer
      visible={visible}
      title={<h3>Create a task template</h3>}
      width={600}
      maskClosable={false}
      keyboard={false}
      onClose={onClose}
      destroyOnClose={true}
    >
      <TaskTemplateForm
        submitButtonText="Create Template"
        handleClose={onClose}
        handleFinish={values =>
          createTaskTemplate({
            variables: {
              input: {
                name: values.name,
                description: values.description,
                assignedTo: values.assignedTo
              }
            },
            refetchQueries: [{ query: GET_TASK_TEMPLATES }]
          })
        }
      />
    </Drawer>
  );
}

export default CreateTaskTemplateDrawer;
