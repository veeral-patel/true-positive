import { useQuery } from "@apollo/react-hooks";
import { Button, Empty, Spin, Tabs, Typography } from "antd";
import ListofTaskTemplates from "container/admin/ListofTaskTemplates";
import ErrorP from "presentational/shared/errors/ErrorP";
import GET_TASK_TEMPLATES from "queries/getTaskTemplates";
import React from "react";
import ITaskTemplate from "ts/interfaces/ITaskTemplate";

const { TabPane } = Tabs;
const { Paragraph } = Typography;

// ---

interface TaskTemplateData {
  taskTemplates: ITaskTemplate[];
}

function CustomizeTaskTemplates() {
  const { loading, data } = useQuery<TaskTemplateData>(GET_TASK_TEMPLATES);

  if (loading) return <Spin />;
  else if (data) {
    if (data.taskTemplates.length === 0) {
      return (
        <Empty
          description={
            <div style={{ marginTop: "1em" }}>
              <h3>No task templates</h3>
              <Paragraph>
                Create templates for common tasks, so you can quickly create
                tasks from them later.
              </Paragraph>
              <Button icon="plus">Create task template</Button>
            </div>
          }
        />
      );
    } else {
      return <ListofTaskTemplates taskTemplates={data.taskTemplates} />;
    }
  } else {
    return (
      <ErrorP
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
