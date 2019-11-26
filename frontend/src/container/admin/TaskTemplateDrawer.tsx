import { useQuery } from "@apollo/react-hooks";
import { Button, Drawer, Form, Input, Spin } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { WrappedFormUtils } from "antd/lib/form/Form";
import { observer } from "mobx-react";
import ErrorP from "presentational/shared/errors/ErrorP";
import GET_ONE_TASK_TEMPLATE from "queries/getOneTaskTemplate";
import React from "react";
import ITaskTemplate from "ts/interfaces/ITaskTemplate";

// ---

interface FormProps {
  form: WrappedFormUtils;
  currentTemplate: ITaskTemplate;
}

// Don't use me directly
function DumbTaskTemplateForm(props: FormProps) {
  const { currentTemplate } = props;
  const { getFieldDecorator } = props.form;

  return (
    <Form colon={false}>
      <Form.Item label="Name">
        {getFieldDecorator("name", {
          rules: [
            {
              required: true,
              message:
                "Please provide a default name for tasks created with this template"
            }
          ],
          initialValue: currentTemplate.name
        })(<Input placeholder="Your task's name" />)}
      </Form.Item>
    </Form>
  );
}

// use me instead
const TaskTemplateForm = Form.create<FormProps & FormComponentProps>()(
  observer(DumbTaskTemplateForm)
);

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

function TaskTemplateDrawer(props: DrawerProps) {
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

  let drawerContent: React.ReactNode = null;
  if (loading) drawerContent = <Spin />;
  else if (error) {
    drawerContent = (
      <ErrorP
        title="Couldn't retrieve template"
        subtitle="Ensure your Internet connection is working"
      />
    );
  } else if (data) {
    drawerContent = (
      <>
        <TaskTemplateForm currentTemplate={data.taskTemplate} />
        <div
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            width: "100%",
            borderTop: "1px solid #e9e9e9",
            padding: "10px 16px",
            background: "#fff",
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
      title="Edit task template"
      visible={isOpen}
      onClose={handleClose}
      width={500}
      maskClosable={false}
      keyboard={false}
    >
      {drawerContent}
    </Drawer>
  );
}

export default TaskTemplateDrawer;
