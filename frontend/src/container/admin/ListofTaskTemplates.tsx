import { Button, List, Popconfirm } from "antd";
import React from "react";
import ITaskTemplate from "ts/interfaces/ITaskTemplate";
import { formatDateOnly } from "utils/formatISO8601";

interface Props {
  taskTemplates: ITaskTemplate[];
}

function ListofTaskTemplates(props: Props) {
  return (
    <List
      itemLayout="horizontal"
      dataSource={props.taskTemplates}
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
          <List.Item.Meta
            title={template.name}
            description={`Created by ${
              template.createdBy.username
            } on ${formatDateOnly(template.createdAt)} (UTC)`}
          />
        </List.Item>
      )}
    />
  );
}

export default ListofTaskTemplates;
