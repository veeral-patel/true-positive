import { Icon, Input, Typography } from "antd";
import ListofPriorities from "container/admin/ListofPriorities";
import { inject, observer } from "mobx-react";
import React from "react";
import PriorityStore from "stores/PriorityStore";

const { Paragraph } = Typography;

const HelperText = () => (
  <div>
    <h3>Customize Priorities</h3>
    <Paragraph>
      You can customize the default list of case priorities to fit your
      workflow.
    </Paragraph>
    <Paragraph type="secondary">
      You cannot delete a priority if an existing case has that priority.
    </Paragraph>
  </div>
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
                  placeholder="Create a priority"
                  prefix={<Icon type="plus" />}
                  suffix={suffix}
                  value={inputValue}
                  onChange={event =>
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
