import { Avatar, Icon, Layout, List, Select } from "antd";
import React from "react";

const { Content } = Layout;
const { Option } = Select;

interface MembersProps {}

const data = [
  {
    username: "rob",
    email: "rob@example.org"
  },
  {
    username: "john",
    email: "john@example.org"
  }
];

const RoleSelect = () => (
  <Select defaultValue="lucy" style={{ width: 120 }}>
    <Option value="jack">Jack</Option>
    <Option value="lucy">Lucy</Option>
    <Option value="disabled" disabled>
      Disabled
    </Option>
    <Option value="Yiminghe">yiminghe</Option>
  </Select>
);

const Members: React.FC<MembersProps> = () => (
  <Content
    style={{
      background: "#fff",
      padding: 24,
      margin: 0,
      minHeight: 280
    }}
  >
    <h2>Members</h2>
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={member => (
        <List.Item>
          <List.Item.Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            title={member.username}
            description={member.email}
          />
          <div>
            <div style={{ marginRight: "30px", display: "inline-block" }}>
              <RoleSelect />
            </div>
            <Icon type="cross" />
          </div>
        </List.Item>
      )}
    />
  </Content>
);

export default Members;
