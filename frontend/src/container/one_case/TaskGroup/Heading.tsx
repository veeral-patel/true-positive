import { useMutation } from "@apollo/react-hooks";
import { message, notification, Typography } from "antd";
import { ApolloError } from "apollo-boost";
import { inject, observer } from "mobx-react";
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
    </div>
  );
}

export default inject("activeCaseStore")(observer(Heading));
