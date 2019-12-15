import { DeleteOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/react-hooks";
import { Button, message, Modal, notification, Typography } from "antd";
import { ApolloError } from "apollo-boost";
import { inject, observer } from "mobx-react";
import DELETE_A_TASK_GROUP from "mutations/deleteTaskGroup";
import UPDATE_TASK_GROUP from "mutations/updateTaskGroup";
import React from "react";
import ActiveCaseStore from "stores/ActiveCaseStore";
const { Text } = Typography;

interface Props {
  heading: string;
  activeCaseStore?: ActiveCaseStore;
  id: number; // id of the task group
}

function Heading({ heading, activeCaseStore, id }: Props) {
  const [renameTaskGroup] = useMutation(UPDATE_TASK_GROUP, {
    onCompleted: function() {
      message.success("Renamed task group");
      activeCaseStore!.loadActiveCase();
    },
    onError: function(error: ApolloError) {
      notification.error({
        message: "An error occurred while renaming the task group",
        description: error
      });
    }
  });

  const [deleteTaskGroup] = useMutation(DELETE_A_TASK_GROUP, {
    onCompleted: function() {
      message.success("Deleted task group");
    },
    onError: function(error: ApolloError) {
      notification.error({
        message: "Could not delete this task group",
        description: error.message
      });
    }
  });

  return (
    <div style={{ marginBottom: "0.75em", marginTop: "2.25em" }}>
      <Text
        type="secondary"
        style={{ textTransform: "uppercase" }}
        editable={{
          onChange: newName => {
            renameTaskGroup({
              variables: {
                input: {
                  id,
                  name: newName
                }
              }
            });
          }
        }}
      >
        {heading}
      </Text>
      <Button
        icon={<DeleteOutlined />}
        type="link"
        onClick={() => {
          Modal.confirm({
            title: "Delete this task group?",
            content: "This will also delete all the tasks in this task group.",
            onOk: () => {
              deleteTaskGroup({
                variables: {
                  input: {
                    id: id
                  }
                }
              });
            }
          });
        }}
      />
    </div>
  );
}

export default inject("activeCaseStore")(observer(Heading));
