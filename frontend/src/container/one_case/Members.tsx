import { RouteComponentProps } from "@reach/router";
import { Layout } from "antd";
import Text from "antd/lib/typography/Text";
import { inject, observer } from "mobx-react";
import MemberListP from "presentational/one_case/MembersP/MemberListP";
import React from "react";
import ActiveCaseStore from "stores/ActiveCaseStore";

const { Content } = Layout;

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
              <div style={{ marginTop: "15px", marginBottom: "15px" }}>
                <Text>Only members of a case are authorized to view it.</Text>
              </div>
              <MemberListP members={members} />
            </Content>
          );
        }
      }
    }
  )
);
