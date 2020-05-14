import { DeleteOutlined } from "@ant-design/icons";
import { MutationResult } from "@apollo/react-common";
import { useMutation } from "@apollo/react-hooks";
import { Button, List, message, notification, Popconfirm } from "antd";
import { ApolloError } from "apollo-boost";
import UpdateTaskTemplateDrawer from "container/admin/UpdateTaskTemplateDrawer";
import DELETE_A_TASK_TEMPLATE from "mutations/deleteTaskTemplate";
import GET_TASK_TEMPLATES from "queries/getTaskTemplates";
import React, { useState } from "react";
import ITaskTemplate from "ts/interfaces/ITaskTemplate";
import { formatDateOnly } from "utils/formatISO8601";

interface Props {
  taskTemplates: ITaskTemplate[];
}

function ListofTaskTemplates({ taskTemplates }: Props) {
  /* toggle the drawer. you must also set the ID of the template to show (below) */
  /* in order to show the drawer. */
  const [drawerIsOpen, toggleDrawer] = useState(false);

  /* set the ID of the template to show in the drawer. */
  const [idOfVisibleTemplate, setIdOfVisibleTemplate] = useState<number | null>(
    null
  );

  const [deleteTaskTemplate] = useMutation(DELETE_A_TASK_TEMPLATE, {
    onCompleted: function() {
      message.success("Deleted the template");
    },
    onError: function(error: ApolloError) {
      notification.error({
        message: "Could not delete the template",
        description: error.message
      });
    }
  });

  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={taskTemplates}
        bordered
        renderItem={template => (
          <List.Item
            actions={[
              <Popconfirm
                title="Delete this template?"
                okText="Yes, Delete"
                cancelText="No"
                onConfirm={() =>
                  deleteTaskTemplate({
                    variables: {
                      input: {
                        id: template.id
                      }
                    },
                    refetchQueries: function(result: MutationResult) {
                      return [{ query: GET_TASK_TEMPLATES }];
                    }
                  })
                }
              >
                <Button type="link" icon={<DeleteOutlined />} />
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
      <UpdateTaskTemplateDrawer
        /* never render the drawer if we don't know the ID of the template to render. */
        visible={drawerIsOpen && idOfVisibleTemplate !== null}
        handleClose={() => toggleDrawer(false)}
        templateId={idOfVisibleTemplate}
      />
    </>
  );
}

export default ListofTaskTemplates;
