import { useQuery } from "@apollo/react-hooks";
import { Button, List, Popconfirm, Spin } from "antd";
import ErrorP from "presentational/shared/errors/ErrorP";
import GET_TASK_TEMPLATES from "queries/getTaskTemplates";
import React from "react";
import ITaskTemplate from "ts/interfaces/ITaskTemplate";

interface TaskTemplateData {
  taskTemplates: ITaskTemplate[];
}

function ListofTaskTemplates() {
  const { loading, error, data } = useQuery<TaskTemplateData>(
    GET_TASK_TEMPLATES
  );

  if (loading) return <Spin />;
  else if (error) {
    return (
      <ErrorP
        title="Couldn't fetch task templates"
        subtitle="Please check your Internet connection"
      />
    );
  } else if (data) {
    return (
      <List
        itemLayout="horizontal"
        dataSource={data.taskTemplates}
        bordered
        renderItem={template => (
          <List.Item
            actions={[
              <Popconfirm
                title="Delete this template?"
                okText="Yes, Delete"
                cancelText="No"
              >
                <Button type="link" icon="delete" />
              </Popconfirm>
            ]}
          >
            <List.Item.Meta title={template.name} />
          </List.Item>
        )}
      />
    );
  }
  return null;
}

export default ListofTaskTemplates;
