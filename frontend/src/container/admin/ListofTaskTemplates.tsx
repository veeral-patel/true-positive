import { Button, List, Popconfirm } from "antd";
import TaskTemplateDrawer from "container/admin/TaskTemplateDrawer";
import React, { useState } from "react";
import ITaskTemplate from "ts/interfaces/ITaskTemplate";
import { formatDateOnly } from "utils/formatISO8601";

interface Props {
  taskTemplates: ITaskTemplate[];
}

function ListofTaskTemplates(props: Props) {
  const [modalIsOpen, toggleModal] = useState(false);
  return (
    <>
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
              title={<a onClick={() => toggleModal(true)}>{template.name}</a>}
              description={`Created by ${
                template.createdBy.username
              } on ${formatDateOnly(template.createdAt)} (UTC)`}
            />
          </List.Item>
        )}
      />
      <TaskTemplateDrawer
        isOpen={modalIsOpen}
        handleClose={() => toggleModal(false)}
      />
    </>
  );
}

export default ListofTaskTemplates;
