import { PlusOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@apollo/react-hooks";
import {
  Button,
  Drawer,
  Empty,
  message,
  notification,
  Spin,
  Typography
} from "antd";
import ListofTaskTemplates from "container/admin/ListofTaskTemplates";
import CREATE_A_TASK_TEMPLATE from "mutations/createTaskTemplate";
import Error from "presentational/shared/errors/Error";
import GET_TASK_TEMPLATES from "queries/getTaskTemplates";
import React, { useState } from "react";
import ITaskTemplate from "ts/interfaces/ITaskTemplate";
import TaskTemplateForm from "./TaskTemplateForm";

const { Paragraph } = Typography;

// ---

interface TaskTemplateData {
  taskTemplates: ITaskTemplate[];
}

function CustomizeTaskTemplates() {
  const { loading, data, error } = useQuery<TaskTemplateData>(
    GET_TASK_TEMPLATES
  );
  const [openDrawer, setOpenDrawer] = useState<"CREATE_TASK_TEMPLATE" | null>(
    null
  );

  const [createTaskTemplate] = useMutation(CREATE_A_TASK_TEMPLATE, {
    onCompleted: () => {
      message.success("Created task template");

      // Close drawer after creating a T.T.
      setOpenDrawer(null);
    },
    onError: error => {
      notification.error({
        message: "Failed to create task template",
        description: error.message
      });
    }
  });

  if (loading) return <Spin />;
  else if (data) {
    return (
      <>
        {data.taskTemplates.length === 0 ? (
          <Empty
            description={
              <div style={{ marginTop: "1em" }}>
                <h3>No task templates</h3>
                <Paragraph>
                  Create task templates to scaffold tasks in case templates.
                </Paragraph>
                <Button
                  icon={<PlusOutlined />}
                  onClick={() => setOpenDrawer("CREATE_TASK_TEMPLATE")}
                >
                  Create task template
                </Button>
              </div>
            }
          />
        ) : (
          <>
            <Paragraph style={{ marginBottom: "0.5em" }}>
              Create task templates to scaffold tasks in case templates.
            </Paragraph>
            <Button
              type="link"
              style={{ paddingLeft: 0 }}
              onClick={() => setOpenDrawer("CREATE_TASK_TEMPLATE")}
            >
              Create Template
            </Button>
            <div style={{ marginTop: "1em" }} />
            <ListofTaskTemplates taskTemplates={data.taskTemplates} />
          </>
        )}
        <Drawer
          visible={openDrawer === "CREATE_TASK_TEMPLATE"}
          title={<h3>Create a task template</h3>}
          width={600}
          maskClosable={false}
          keyboard={false}
          onClose={() => setOpenDrawer(null)}
        >
          <TaskTemplateForm
            submitButtonText="Create Template"
            handleClose={() => setOpenDrawer(null)}
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
      </>
    );
  } else if (error) {
    return (
      <Error title="Couldn't fetch task templates" subtitle={error.message} />
    );
  }
  return null;
}

export default CustomizeTaskTemplates;
