import { useQuery } from "@apollo/react-hooks";
import { Spin, Tabs } from "antd";
import ListofTaskTemplates from "container/admin/ListofTaskTemplates";
import ErrorP from "presentational/shared/errors/ErrorP";
import GET_TASK_TEMPLATES from "queries/getTaskTemplates";
import React from "react";
import ITaskTemplate from "ts/interfaces/ITaskTemplate";

const { TabPane } = Tabs;

interface TaskTemplateData {
  taskTemplates: ITaskTemplate[];
}

function CustomizeTaskTemplates() {
  const { loading, data } = useQuery<TaskTemplateData>(GET_TASK_TEMPLATES);

  if (loading) return <Spin />;
  else if (data) {
    return <ListofTaskTemplates taskTemplates={data.taskTemplates} />;
  } else {
    return (
      <ErrorP
        title="Couldn't fetch task templates"
        subtitle="Please check your Internet connection"
      />
    );
  }
}

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
