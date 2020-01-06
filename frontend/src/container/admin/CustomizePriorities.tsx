import {
  ArrowRightOutlined,
  LoadingOutlined,
  PlusOutlined
} from "@ant-design/icons";
import { Button, Divider, Form, Input, Typography } from "antd";
import ListofPriorities from "container/admin/ListofPriorities";
import PrioritySelect from "container/shared/priorities/PrioritySelect";
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
          <LoadingOutlined />
        ) : (
          <ArrowRightOutlined />
        );

        return (
          <div>
            <HelperText />
            <div style={{ marginTop: "20px" }}>
              <div style={{ marginBottom: "20px" }}>
                <Input
                  placeholder="Create a priority"
                  prefix={<PlusOutlined />}
                  suffix={suffix}
                  value={inputValue}
                  onChange={event =>
                    this.setState({ inputValue: event.currentTarget.value })
                  }
                  onPressEnter={() => {
                    if (!inputValue) return; // ignore empty input
                    priorityStore!.createPriority(inputValue);
                    this.setState({ inputValue: "" });
                  }}
                />
              </div>
              <div>
                <ListofPriorities />
              </div>
              <Divider />
              <div style={{ marginTop: "1em" }}>
                <Paragraph>Default Priority</Paragraph>
                <Paragraph type="secondary">
                  If you don't want to choose a priority each time you create a
                  case, choose a default priority below.
                </Paragraph>
                <Paragraph type="secondary">
                  Then, the UI will pre-populate the priority field with the
                  default priority you chose.
                </Paragraph>
                <Form
                  colon={false}
                  layout="horizontal"
                  style={{ display: "flex" }}
                >
                  <Form.Item
                    name="default_priority"
                    style={{ width: "300px", marginRight: "0.5em" }}
                  >
                    <PrioritySelect includeNone={true} />
                  </Form.Item>
                  <Form.Item>
                    <Button htmlType="submit">Update</Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        );
      }
    }
  )
);
