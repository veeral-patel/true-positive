import {
  ArrowRightOutlined,
  LoadingOutlined,
  PlusOutlined
} from "@ant-design/icons";
import { Button, Divider, Form, Input, Typography } from "antd";
import ListofStatuses from "container/admin/ListofStatuses";
import StatusSelect from "container/shared/statuses/StatusSelect";
import { inject, observer } from "mobx-react";
import React from "react";
import StatusStore from "stores/StatusStore";

const { Paragraph } = Typography;

const HelperText = () => (
  <div>
    <h3>Customize Statuses</h3>
    <Paragraph>
      You can customize the default list of case statuses to fit your workflow.
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
          <LoadingOutlined />
        ) : (
          <ArrowRightOutlined />
        );

        return (
          <div>
            <HelperText />
            <div style={{ marginTop: "20px", marginBottom: "20px" }}>
              <Input
                placeholder="Create a status"
                prefix={<PlusOutlined />}
                suffix={suffix}
                value={inputValue}
                onChange={event =>
                  this.setState({ inputValue: event.currentTarget.value })
                }
                onPressEnter={() => {
                  if (!inputValue) return; // ignore empty input
                  statusStore!.createStatus(inputValue);
                  this.setState({ inputValue: "" });
                }}
              />
            </div>
            <div>
              <ListofStatuses />
            </div>
            <Divider />
            <div style={{ marginTop: "1em" }}>
              <Paragraph>Default Status</Paragraph>
              <Paragraph type="secondary">
                If you don't want to choose a status each time you create a
                case, choose a default status below.
              </Paragraph>
              <Paragraph type="secondary">
                Then, the UI will pre-populate the status field with the default
                status you chose.
              </Paragraph>
              <Form
                colon={false}
                layout="horizontal"
                style={{ display: "flex" }}
              >
                <Form.Item
                  name="default_status"
                  style={{ width: "300px", marginRight: "0.5em" }}
                >
                  <StatusSelect includeNone={true} />
                </Form.Item>
                <Form.Item>
                  <Button htmlType="submit">Update</Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        );
      }
    }
  )
);
