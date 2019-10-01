import { RouteComponentProps } from "@reach/router";
import { Avatar, Button, Layout, List, Select, Typography } from "antd";
import AddMembersForm from "container/one_case/AddMembersForm";
import { inject, observer } from "mobx-react";
import React from "react";
import ActiveCaseStore from "stores/ActiveCaseStore";
import UserStore from "stores/UserStore";
import ICaseMember from "ts/interfaces/ICaseMember";

const { Content } = Layout;
const { Option } = Select;
const { Paragraph } = Typography;

interface MembersProps extends RouteComponentProps {
  activeCaseStore?: ActiveCaseStore;
  userStore?: UserStore;
}

export default inject("activeCaseStore", "userStore")(
  observer(
    class Members extends React.Component<MembersProps> {
      componentDidMount() {
        const { userStore } = this.props;
        userStore!.loadUsers();
      }

      render() {
        const { activeCaseStore, userStore } = this.props;
        const activeCase = activeCaseStore!.activeCase;

        // make a list of the usernames of existing members
        const usernamesOfMembers = activeCase!.caseMembers.map(
          member => member.user.username
        );

        // only show non-members in our dropdown
        const userOptions = userStore!.users.map(user => {
          if (!usernamesOfMembers.includes(user.username)) {
            return <Option key={user.username}>{user.username}</Option>;
          }
        });

        // should always render, since we're handling error/loading states above this component (as a HOC)
        if (activeCase) {
          const members = activeCase.caseMembers;
          return (
            <Content
              style={{
                background: "#fff",
                padding: 24,
                margin: 0,
                minHeight: 280
              }}
            >
              <h3>Members ({members.length})</h3>
              <Paragraph>
                Only members of a case are authorized to view it.
              </Paragraph>
              <div style={{ marginBottom: "1em" }}>
                {userStore!.usersAreLoading ? (
                  "Loading..."
                ) : (
                  <AddMembersForm userOptions={userOptions} />
                )}
              </div>
              <List<ICaseMember>
                itemLayout="horizontal"
                dataSource={members}
                renderItem={member => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar icon="user" />}
                      title={member.user.username}
                      description={member.user.email}
                    />
                    <Button
                      icon="cross"
                      style={{ border: "none" }}
                      onClick={() =>
                        activeCaseStore!.removeCaseMember(member.user.username)
                      }
                    />
                  </List.Item>
                )}
              />
            </Content>
          );
        }
      }
    }
  )
);
