import { Icon, Input, Typography } from "antd";
import ListofPriorities from "container/admin/ListofPriorities";
import { inject, observer } from "mobx-react";
import React from "react";
import PriorityStore from "stores/PriorityStore";

const { Paragraph, Text } = Typography;

const HelperText = () => (
  <Text>
    <h4>Customize Priorities</h4>
    <Paragraph>
      You can customize the default list of priorities to fit your workflow.
    </Paragraph>
  </Text>
);

// -----------

interface CustomizePrioritiesProps {
  priorityStore?: PriorityStore;
}

interface CustomizePrioritiesState {
  inputValue: string;
}

export default inject("priorityStore")(
  observer(
    class CustomizePriorities extends React.Component<
      CustomizePrioritiesProps,
      CustomizePrioritiesState
    > {
      state = {
        inputValue: ""
      };

      render() {
        const { priorityStore } = this.props;
        const { inputValue } = this.state;

        const priorityIsBeingCreated = priorityStore!.priorityIsBeingCreated;
        const suffix = priorityIsBeingCreated ? (
          <Icon type="loading" />
        ) : (
          <Icon type="arrow-right" />
        );

        return (
          <div>
            <HelperText />
            <div style={{ marginTop: "20px" }}>
              <div style={{ marginBottom: "20px" }}>
                <Input
                  placeholder="Enter the name of a priority to create it"
                  prefix={<Icon type="plus" />}
                  suffix={suffix}
                  value={inputValue}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    this.setState({ inputValue: event.currentTarget.value })
                  }
                  onPressEnter={() => {
                    priorityStore!.createPriority(inputValue);
                    this.setState({ inputValue: "" });
                  }}
                />
              </div>
              <ListofPriorities />
            </div>
          </div>
        );
      }
    }
  )
);
