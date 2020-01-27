import { CloseOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/react-hooks";
import { navigate, RouteComponentProps } from "@reach/router";
import {
  Avatar,
  Button,
  Divider,
  Empty,
  Layout,
  List,
  message,
  Modal,
  notification,
  Popconfirm,
  Select,
  Tag,
  Typography
} from "antd";
import { ApolloError } from "apollo-boost";
import GroupDrawer from "container/admin/GroupDrawer";
import { inject, observer } from "mobx-react";
import REMOVE_GROUP_FROM_CASE from "mutations/removeGroupFromCase";
import React, { useEffect, useState } from "react";
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

function Members({ activeCaseStore, uiStore, userStore }: Props) {
  const activeCase = activeCaseStore!.activeCase;
  const [idOfOpenGroup, setIdOfOpenGroup] = useState<number | null>(null);

  useEffect(() => userStore!.loadUsers());

  const [removeGroupFromCase] = useMutation(REMOVE_GROUP_FROM_CASE, {
    onCompleted: function() {
      message.success("Removed group");
      activeCaseStore!.loadActiveCase();
    },
    onError: function(error: ApolloError) {
      notification.error({
        message: "Failed to remove group",
        description: error.message
      });
    }
  });

  // should always render, since we're handling error/loading states above this component (as a HOC)
  if (activeCase) {
    return (
      <>
        <Content
          style={{
            backgroundColor: uiStore!.theme === "LIGHT" ? "#fff" : "#141414",
            padding: 24,
            margin: 0,
            minHeight: 280
          }}
        >
          <h3>Members</h3>
          <Paragraph>
            Only the users and the members of the groups below can access this
            case.
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
                      activeCaseStore!.removeCaseMember(member.user.username);
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
            locale={{
              emptyText: (
                <Empty
                  description={
                    <div>
                      <Paragraph>No groups</Paragraph>
                      <Paragraph type="secondary">
                        Grant a group access to this case above
                      </Paragraph>
                    </div>
                  }
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              )
            }}
            renderItem={caseGroup => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar icon={<TeamOutlined />} />}
                  title={
                    <a onClick={() => setIdOfOpenGroup(caseGroup.group.id)}>
                      {caseGroup.group.name}
                    </a>
                  }
                  description={`${caseGroup.group.userCount} users`}
                />
                <Select<"CAN_VIEW" | "CAN_EDIT">
                  value={caseGroup.role}
                  style={{ width: "120px" }}
                >
                  <Option value="CAN_VIEW">Can View</Option>
                  <Option value="CAN_EDIT">Can Edit</Option>
                </Select>
                <Popconfirm
                  title="Remove this group?"
                  okText="Yes, Remove"
                  cancelText="No"
                  onConfirm={() =>
                    removeGroupFromCase({
                      variables: {
                        input: {
                          groupId: caseGroup.group.id,
                          caseId: activeCase.id
                        }
                      }
                    })
                  }
                >
                  <Button
                    icon={<CloseOutlined />}
                    style={{ border: "none", marginLeft: "1em" }}
                  />
                </Popconfirm>
              </List.Item>
            )}
          />
        </Content>
        <GroupDrawer
          visible={idOfOpenGroup !== null}
          onClose={() => setIdOfOpenGroup(null)}
          groupId={idOfOpenGroup}
          forViewingOnly
        />
      </>
    );
  }
  return null;
}

export default inject(
  "activeCaseStore",
  "uiStore",
  "userStore"
)(observer(Members));
