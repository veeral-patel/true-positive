import { RouteComponentProps } from "@reach/router";
import { Divider, Icon, Input, Radio, Typography } from "antd";
import React from "react";
const { Paragraph } = Typography;

interface Props extends RouteComponentProps {}

class AllTasksPage extends React.Component<Props> {
  render() {
    return (
      <div>
        <section>
          <h2>Tasks</h2>
          <Paragraph>
            These are all the tasks from the cases you're a member of.
          </Paragraph>
        </section>
        <section>
          <span
            style={{
              marginBottom: "30px",
              width: "40%",
              display: "inline-block"
            }}
          >
            <Input placeholder="Filter tasks" prefix={<Icon type="search" />} />
          </span>
          <span style={{ marginLeft: "8px", marginRight: "8px" }}>
            <Divider type="vertical" />
          </span>
          <span>
            <Radio.Group defaultValue="assigned">
              <Radio.Button value="assigned">Assigned</Radio.Button>
              <Radio.Button value="all">All</Radio.Button>
            </Radio.Group>
          </span>
        </section>
      </div>
    );
  }
}

export default AllTasksPage;
