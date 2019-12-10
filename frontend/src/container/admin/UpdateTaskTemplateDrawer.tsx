import { useMutation, useQuery } from "@apollo/react-hooks";
import { Button, Drawer, Form, Input, message, notification, Spin } from "antd";
import { ApolloError } from "apollo-boost";
import GenericEditor from "container/shared/markdown/GenericEditor";
import UPDATE_TASK_TEMPLATE from "mutations/updateTaskTemplate";
import Error from "presentational/shared/errors/Error";
import GET_ONE_TASK_TEMPLATE from "queries/getOneTaskTemplate";
import React from "react";
import ITaskTemplate from "ts/interfaces/ITaskTemplate";

// ---

interface DrawerProps {
  /* Whether to render this drawer. */
  isOpen: boolean;

  /* Callback to close this drawer. */
  handleClose: () => void;

  /* ID of the task template to show. */
  templateId: number | null;
}

interface OneTemplateData {
  taskTemplate: ITaskTemplate;
}

function UpdateTaskTemplateDrawer(props: DrawerProps) {
  const { isOpen, handleClose, templateId } = props;

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
      <Error
        title="Couldn't retrieve template"
        subtitle="Ensure your Internet connection is working"
      />
    );
  } else if (data) {
    drawerContent = (
      <>
        <Form
          colon={false}
          layout="vertical"
          initialValues={{ name: data.taskTemplate.name }}
          onFinish={values =>
            updateTaskTemplate({
              variables: {
                input: {
                  id: data.taskTemplate.id,
                  name: values.name,
                  description: values.description
                }
              }
            })
          }
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message:
                  "Please provide a default name for tasks created with this template"
              }
            ]}
          >
            <Input placeholder="Your task's name" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <GenericEditor />
          </Form.Item>
          <Form.Item>
            <div>
              <Button style={{ marginRight: "1em" }} onClick={handleClose}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Update Template
              </Button>
            </div>
          </Form.Item>
        </Form>
      </>
    );
  }

  return (
    <Drawer
      title={<h3>Update task template</h3>}
      visible={isOpen}
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
