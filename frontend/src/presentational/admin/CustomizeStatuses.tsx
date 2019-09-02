import { Icon, Input, Typography } from "antd";
import ListofStatuses from "container/admin/ListofStatuses";
import { inject, observer } from "mobx-react";
import React from "react";
import StatusStore from "stores/StatusStore";

const { Paragraph, Text } = Typography;

const HelperText = () => (
  <Text>
    <h4>Customize Statuses</h4>
    <Paragraph>
      You can customize the default list of statuses to fit your workflow.
    </Paragraph>
  </Text>
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
      constructor(props: CustomizeStatusesProps) {
        super(props);
        this.state = {
          inputValue: ""
        };
      }

      render() {
        const { statusStore } = this.props;
        const { inputValue } = this.state;

        return (
          <div>
            <HelperText />
            <div style={{ marginTop: "20px", marginBottom: "20px" }}>
              <Input
                placeholder="Enter the name of a status to create it"
                prefix={<Icon type="plus" />}
                suffix={<Icon type="arrow-right" />}
                value={inputValue}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  this.setState({ inputValue: event.currentTarget.value })
                }
                onPressEnter={() => statusStore!.createStatus(inputValue)}
              />
            </div>
            <ListofStatuses />
          </div>
        );
      }
    }
  )
);
