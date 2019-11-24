import { Button, List, Popconfirm } from "antd";
import TaskTemplateDrawer from "container/admin/TaskTemplateDrawer";
import React, { useState } from "react";
import ITaskTemplate from "ts/interfaces/ITaskTemplate";
import { formatDateOnly } from "utils/formatISO8601";

interface Props {
  taskTemplates: ITaskTemplate[];
}

function ListofTaskTemplates(props: Props) {
  /* toggle the drawer. you must also set the ID of the template to show (below) */
  /* in order to show the drawer. */
  const [drawerIsOpen, toggleDrawer] = useState(false);

  /* set the ID of the template to show in the drawer. */
  const [idOfVisibleTemplate, setIdOfVisibleTemplate] = useState<number | null>(
    null
  );

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
              title={
                <a
                  onClick={() => {
                    /* open the drawer and tell it which template to render. */
                    toggleDrawer(true);
                    setIdOfVisibleTemplate(template.id);
                  }}
                >
                  {template.name}
                </a>
              }
              description={`Created by ${
                template.createdBy.username
              } on ${formatDateOnly(template.createdAt)} (UTC)`}
            />
          </List.Item>
        )}
      />
      <TaskTemplateDrawer
        /* never render the drawer if we don't know the ID of the template to render. */
        isOpen={drawerIsOpen && idOfVisibleTemplate != null}
        handleClose={() => {
          toggleDrawer(false);
          setIdOfVisibleTemplate(null);
        }}
        templateId={idOfVisibleTemplate}
      />
    </>
  );
}

export default ListofTaskTemplates;
