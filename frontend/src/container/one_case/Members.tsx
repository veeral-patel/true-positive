import { CloseOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { navigate, RouteComponentProps } from "@reach/router";
import {
  Avatar,
  Button,
  Divider,
  Layout,
  List,
  Modal,
  Popconfirm,
  Select,
  Tag,
  Typography
} from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import ActiveCaseStore from "stores/ActiveCaseStore";
import UIStore from "stores/UIStore";
import UserStore from "stores/UserStore";
import ICaseGroup from "ts/interfaces/ICaseGroup";
import ICaseMember from "ts/interfaces/ICaseMember";
import { paths } from "utils/constants";
import getUsernameOfCurrentUser from "utils/currentUser";
import AddMembersForm2 from "./AddMembersForm2";

const { Content } = Layout;
const { Option } = Select;
const { Paragraph } = Typography;

interface Props extends RouteComponentProps {
  activeCaseStore?: ActiveCaseStore;
  userStore?: UserStore;
  uiStore?: UIStore;
}

export default inject(
  "activeCaseStore",
  "userStore",
  "uiStore"
)(
  observer(
    class Members extends React.Component<Props> {
      componentDidMount() {
        const { userStore } = this.props;
        userStore!.loadUsers();
      }

      render() {
        const { activeCaseStore, uiStore } = this.props;
        const activeCase = activeCaseStore!.activeCase;

        // should always render, since we're handling error/loading states above this component (as a HOC)
        if (activeCase) {
          return (
            <Content
              style={{
                backgroundColor:
                  uiStore!.theme === "LIGHT" ? "#fff" : "#141414",
                padding: 24,
                margin: 0,
                minHeight: 280
              }}
            >
              <h3>Members</h3>
              <Paragraph>
                Only the users and the members of the groups below can access
                this case.
              </Paragraph>
              <div style={{ marginBottom: "1em" }}>
                <AddMembersForm2
                  handleFinish={(usernames, groupIds) => {
                    // add each user to the case
                    usernames.map(username =>
                      activeCaseStore!.addCaseMember(username)
                    );

                    // add each group to the case
                    groupIds.map(groupId => {
                      activeCaseStore!.addGroupToCase(groupId);
                    });
                  }}
                />
              </div>
              <Divider orientation="left">
                Users ({activeCase.caseMemberCount})
              </Divider>
              <List<ICaseMember>
                itemLayout="horizontal"
                dataSource={activeCase.caseMembers}
                renderItem={member => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar icon={<UserOutlined />} />}
                      title={
                        <span>
                          {member.user.username}&nbsp;&nbsp;
                          {// show a tag next to the case's creator's username
                          activeCase.createdBy.username ===
                            member.user.username && <Tag>Creator</Tag>}
                        </span>
                      }
                      description={member.user.email}
                    />
                    <Select<"CAN_VIEW" | "CAN_EDIT">
                      value={member.role}
                      style={{ width: "120px" }}
                      onSelect={newRole => {
                        const usernameOfCurrentUser = getUsernameOfCurrentUser();
                        if (
                          usernameOfCurrentUser === member.user.username &&
                          newRole === "CAN_VIEW"
                        ) {
                          Modal.confirm({
                            title: "Make yourself view only?",
                            content:
                              "Are you sure you want to change your role to 'Can View' in this case?",
                            onOk() {
                              activeCaseStore!.changeRole(
                                activeCase.id,
                                member.user.username,
                                newRole
                              );
                            },
                            onCancel() {},
                            okText: "Yes, Change My Role"
                          });
                        } else {
                          activeCaseStore!.changeRole(
                            activeCase.id,
                            member.user.username,
                            newRole
                          );
                        }
                      }}
                    >
                      <Option value="CAN_VIEW">Can View</Option>
                      <Option value="CAN_EDIT">Can Edit</Option>
                    </Select>
                    <Popconfirm
                      title={`Remove ${member.user.username}?`}
                      okText="Yes, Remove"
                      cancelText="No"
                      onConfirm={() => {
                        const usernameOfCurrentUser = getUsernameOfCurrentUser();
                        if (usernameOfCurrentUser === member.user.username) {
                          Modal.confirm({
                            title: "Remove yourself from this case?",
                            content:
                              "You won't be able to view this case anymore after you remove yourself from it.",
                            onOk() {
                              activeCaseStore!.removeCaseMember(
                                member.user.username
                              );
                              navigate(paths.CASES_PATH);
                            },
                            onCancel() {},
                            okText: "Yes, Remove Myself"
                          });
                        } else {
                          activeCaseStore!.removeCaseMember(
                            member.user.username
                          );
                        }
                      }}
                    >
                      {activeCase.caseMembers.length > 1 && (
                        <Button
                          icon={<CloseOutlined />}
                          style={{ border: "none", marginLeft: "1em" }}
                        />
                      )}
                    </Popconfirm>
                  </List.Item>
                )}
              />
              <br />
              <Divider orientation="left">
                Groups ({activeCase.caseGroupCount})
              </Divider>
              <List<ICaseGroup>
                itemLayout="horizontal"
                dataSource={activeCase.caseGroups}
                renderItem={caseGroup => (
                  <List.Item
                    extra={[
                      <Popconfirm
                        title="Remove this group?"
                        okText="Yes, Remove"
                        cancelText="No"
                      >
                        <Button
                          icon={<CloseOutlined />}
                          style={{ border: "none" }}
                        />
                      </Popconfirm>
                    ]}
                  >
                    <List.Item.Meta
                      avatar={<Avatar icon={<TeamOutlined />} />}
                      title={caseGroup.group.name}
                      description={`${caseGroup.group.userCount} users`}
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
