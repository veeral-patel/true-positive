import { Icon, Input, Typography } from "antd";
import ListofStatuses from "container/admin/ListofStatuses";
import { inject, observer } from "mobx-react";
import React from "react";
import StatusStore from "stores/StatusStore";

const { Paragraph, Text } = Typography;

const HelperText = () => (
  <div>
    <h3>Customize Statuses</h3>
    <Paragraph>
      You can customize the default list of statuses to fit your workflow.
    </Paragraph>
    <Paragraph type="secondary">
      You cannot delete a status if an existing case has that status.
    </Paragraph>
  </div>
);

// -----------

interface CustomizeStatusesProps {
  statusStore?: StatusStore;
}

interface CustomizeStatusesState {
  inputValue: string;
}

export default inject("statusStore")(
  observer(
    class CustomizeStatuses extends React.Component<
      CustomizeStatusesProps,
      CustomizeStatusesState
    > {
      state = {
        inputValue: ""
      };

      render() {
        const { statusStore } = this.props;
        const { inputValue } = this.state;

        const statusIsBeingCreated = statusStore!.statusIsBeingCreated;
        const suffix = statusIsBeingCreated ? (
          <Icon type="loading" />
        ) : (
          <Icon type="arrow-right" />
        );

        return (
          <div>
            <HelperText />
            <div style={{ marginTop: "20px", marginBottom: "20px" }}>
              <Input
                placeholder="Create a status"
                prefix={<Icon type="plus" />}
                suffix={suffix}
                value={inputValue}
                onChange={event =>
                  this.setState({ inputValue: event.currentTarget.value })
                }
                onPressEnter={() => {
                  statusStore!.createStatus(inputValue);
                  this.setState({ inputValue: "" });
                }}
              />
            </div>
            <ListofStatuses />
          </div>
        );
      }
    }
  )
);
