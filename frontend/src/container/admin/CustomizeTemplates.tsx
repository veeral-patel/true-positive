import { PlusOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@apollo/react-hooks";
import {
  Button,
  Drawer,
  Empty,
  message,
  notification,
  Spin,
  Tabs,
  Typography
} from "antd";
import ListofTaskTemplates from "container/admin/ListofTaskTemplates";
import CREATE_A_TASK_TEMPLATE from "mutations/createTaskTemplate";
import Error from "presentational/shared/errors/Error";
import GET_TASK_TEMPLATES from "queries/getTaskTemplates";
import React, { useState } from "react";
import ITaskTemplate from "ts/interfaces/ITaskTemplate";
import TaskTemplateForm from "./TaskTemplateForm";

const { TabPane } = Tabs;
const { Paragraph } = Typography;

// ---

interface TaskTemplateData {
  taskTemplates: ITaskTemplate[];
}

function CustomizeTaskTemplates() {
  const { loading, data } = useQuery<TaskTemplateData>(GET_TASK_TEMPLATES);
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
                  Create templates for common tasks, so you can quickly create
                  tasks from them later.
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
            handleClose={() => setOpenDrawer(null)}
            handleFinish={values =>
              createTaskTemplate({
                variables: {
                  input: {
                    name: values.name,
                    description: values.description
                  }
                },
                refetchQueries: [{ query: GET_TASK_TEMPLATES }]
              })
            }
          />
        </Drawer>
      </>
    );
  } else {
    return (
      <Error
        title="Couldn't fetch task templates"
        subtitle="Please check your Internet connection"
      />
    );
  }
}

// ---

function CustomizeTemplates() {
  return (
    <>
      <h3>Templates</h3>
      <Tabs defaultActiveKey="task_templates">
        <TabPane key="task_templates" tab="Task Templates">
          <CustomizeTaskTemplates />
        </TabPane>
      </Tabs>
    </>
  );
}

export default CustomizeTemplates;
