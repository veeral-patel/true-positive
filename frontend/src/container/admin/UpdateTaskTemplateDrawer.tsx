import { useMutation, useQuery } from "@apollo/react-hooks";
import { Drawer, message, notification, Spin } from "antd";
import { ApolloError } from "apollo-boost";
import UPDATE_TASK_TEMPLATE from "mutations/updateTaskTemplate";
import Error from "presentational/shared/errors/Error";
import GET_ONE_TASK_TEMPLATE from "queries/getOneTaskTemplate";
import React from "react";
import ITaskTemplate from "ts/interfaces/ITaskTemplate";
import TaskTemplateForm from "./TaskTemplateForm";

// ---

interface DrawerProps {
  /* Whether to render this drawer. */
  visible: boolean;

  /* Callback to close this drawer. */
  handleClose: () => void;

  /* ID of the task template to show. */
  templateId: number | null;
}

interface OneTemplateData {
  taskTemplate: ITaskTemplate;
}

function UpdateTaskTemplateDrawer(props: DrawerProps) {
  const { visible, handleClose, templateId } = props;

  /* retrieve this template's existing information. */
  const { loading, error, data } = useQuery<OneTemplateData>(
    GET_ONE_TASK_TEMPLATE,
    {
      variables: {
        id: templateId
      }
    }
  );

  const [updateTaskTemplate] = useMutation(UPDATE_TASK_TEMPLATE, {
    onCompleted: function() {
      message.success("Updated the template");
      handleClose();
    },
    onError: function(error: ApolloError) {
      notification.error({
        message: "Could not update the template",
        description: error.message
      });
    }
  });

  let drawerContent: React.ReactNode = null;
  if (loading) drawerContent = <Spin />;
  else if (error) {
    drawerContent = (
      <Error title="Couldn't retrieve template" subtitle={error.message} />
    );
  } else if (data) {
    drawerContent = (
      <TaskTemplateForm
        handleClose={handleClose}
        handleFinish={values =>
          updateTaskTemplate({
            variables: {
              input: {
                id: data.taskTemplate.id,
                name: values.name,
                description: values.description,
                assignedTo: values.assignedTo
              }
            }
          })
        }
        initialValues={{
          name: data.taskTemplate.name,
          description: data.taskTemplate.description,
          assignedTo:
            data.taskTemplate.assignedTo === null
              ? null
              : data.taskTemplate.assignedTo.username
        }}
      />
    );
  }

  return (
    <Drawer
      title={<h3>Update task template</h3>}
      visible={visible}
      onClose={handleClose}
      width={600}
      maskClosable={false}
      keyboard={false}
    >
      {drawerContent}
    </Drawer>
  );
}

export default UpdateTaskTemplateDrawer;
