import { DeleteOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/react-hooks";
import {
  Button,
  message,
  Modal,
  notification,
  Tooltip,
  Typography
} from "antd";
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
  // whether this task group is to be displayed in a case template (not a case)
  forCaseTemplate?: boolean;
}

function Heading({
  heading,
  activeCaseStore,
  id,
  forCaseTemplate = false
}: Props) {
  const [updateTaskGroup] = useMutation(UPDATE_TASK_GROUP, {
    onCompleted: function() {
      message.success("Updated the task group");
      if (!forCaseTemplate) activeCaseStore!.loadActiveCase();
    },
    onError: function(error: ApolloError) {
      notification.error({
        message: "An error occurred while updating the task group",
        description: error
      });
    }
  });

  const [deleteTaskGroup] = useMutation(DELETE_A_TASK_GROUP, {
    onCompleted: function() {
      message.success("Deleted task group");
      if (!forCaseTemplate) activeCaseStore!.loadActiveCase();
    },
    onError: function(error: ApolloError) {
      notification.error({
        message: "Could not delete this task group",
        description: error.message
      });
    }
  });

  return (
    <div>
      <Text
        type="secondary"
        style={{ textTransform: "uppercase" }}
        editable={{
          onChange: newName => {
            updateTaskGroup({
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
      <Tooltip title="Delete">
        <Button
          icon={<DeleteOutlined />}
          type="link"
          onClick={() => {
            Modal.confirm({
              title: "Delete this task group?",
              content:
                "This will also delete all the tasks in this task group.",
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
      </Tooltip>
    </div>
  );
}

export default inject("activeCaseStore")(observer(Heading));
