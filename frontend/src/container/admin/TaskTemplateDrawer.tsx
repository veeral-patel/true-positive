import { useQuery } from "@apollo/react-hooks";
import { Button, Drawer, Form, Input, Spin } from "antd";
import GenericEditor from "container/shared/markdown/GenericEditor";
import { inject, observer } from "mobx-react";
import Error from "presentational/shared/errors/Error";
import GET_ONE_TASK_TEMPLATE from "queries/getOneTaskTemplate";
import React from "react";
import UIStore from "stores/UIStore";
import ITaskTemplate from "ts/interfaces/ITaskTemplate";

// ---

interface DrawerProps {
  /* Whether to render this drawer. */
  isOpen: boolean;

  /* Callback to close this drawer. */
  handleClose: () => void;

  /* ID of the task template to show. */
  templateId: number | null;

  uiStore?: UIStore;
}

interface OneTemplateData {
  taskTemplate: ITaskTemplate;
}

function TaskTemplateDrawer(props: DrawerProps) {
  const { isOpen, handleClose, templateId, uiStore } = props;

  /* retrieve this template's existing information. */
  const { loading, error, data } = useQuery<OneTemplateData>(
    GET_ONE_TASK_TEMPLATE,
    {
      variables: {
        id: templateId
      }
    }
  );

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
        </Form>
        <div
          style={{
            position: "absolute",
            right: 0,
            bottom: "0.5em",
            width: "100%",
            padding: "10px 16px",
            textAlign: "right"
          }}
        >
          <Button style={{ marginRight: "1em" }} onClick={handleClose}>
            Cancel
          </Button>
          <Button type="primary">Update Template</Button>
        </div>
      </>
    );
  }

  return (
    <Drawer
      title={<h3>Edit task template</h3>}
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

export default inject("uiStore")(observer(TaskTemplateDrawer));
