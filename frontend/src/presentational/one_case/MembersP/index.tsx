import { Avatar, Icon, Layout, List } from "antd";
import RoleSelectP from "presentational/one_case/MembersP/RoleSelectP";
import React from "react";

const { Content } = Layout;

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
            avatar={<Avatar icon="user" />}
            title={member.username}
            description={member.email}
          />
          <div>
            <div style={{ marginRight: "30px", display: "inline-block" }}>
              <RoleSelectP />
            </div>
            <Icon type="cross" />
          </div>
        </List.Item>
      )}
    />
  </Content>
);

export default Members;
