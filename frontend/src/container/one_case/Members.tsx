import { RouteComponentProps } from "@reach/router";
import { Avatar, Icon, Layout, List, Typography } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import ActiveCaseStore from "stores/ActiveCaseStore";
import ICaseMember from "ts/interfaces/ICaseMember";

const { Content } = Layout;
const { Paragraph } = Typography;

interface MembersProps extends RouteComponentProps {
  activeCaseStore?: ActiveCaseStore;
}

export default inject("activeCaseStore")(
  observer(
    class Members extends React.Component<MembersProps> {
      render() {
        const { activeCaseStore } = this.props;
        const activeCase = activeCaseStore!.activeCase;

        // should always render, since we're catching errors and showing
        // our spinner above this component, as a HOC
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
                    <Icon type="close" />
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
