import { CloseOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@apollo/react-hooks";
import {
  Button,
  Drawer,
  Empty,
  Form,
  List,
  message,
  notification,
  Popconfirm,
  Select,
  Spin,
  Tabs,
  Typography
} from "antd";
import { ApolloError } from "apollo-boost";
import CaseTemplateForm from "container/admin/CaseTemplateForm";
import CreateTaskGroupModal from "container/admin/CreateTaskGroupModal";
import TTGroup from "container/one_case/TTGroup";
import GroupSelect from "container/shared/groups/GroupSelect";
import UserSelect from "container/shared/users/UserSelect";
import ADD_GROUP_TO_CASE_TEMPLATE from "mutations/addGroupToCaseTemplate";
import ADD_TASK_TEMPLATE_TO_TASK_GROUP from "mutations/addTaskTemplateToTaskGroup";
import ADD_USER_TO_CASE_TEMPLATE from "mutations/addUserToCaseTemplate";
import CHANGE_ROLE_IN_CASE_TEMPLATE from "mutations/changeRoleInCaseTemplate";
import CREATE_A_TASK_GROUP from "mutations/createTaskGroup";
import DELETE_A_TASK_GROUP from "mutations/deleteTaskGroup";
import REMOVE_GROUP_FROM_CASE_TEMPLATE from "mutations/removeGroupFromCaseTemplate";
import REMOVE_TASK_TEMPLATE_FROM_TASK_GROUP from "mutations/removeTaskTemplateFromTaskGroup";
import REMOVE_USER_FROM_CASE_TEMPLATE from "mutations/removeUserFromCaseTemplate";
import UPDATE_CASE_TEMPLATE from "mutations/updateCaseTemplate";
import UPDATE_TASK_GROUP from "mutations/updateTaskGroup";
import Error from "presentational/shared/errors/Error";
import GET_ONE_CASE_TEMPLATE from "queries/getOneCaseTemplate";
import React, { useState } from "react";
import ICaseGroup from "ts/interfaces/ICaseGroup";
import ICaseMember from "ts/interfaces/ICaseMember";
import ICaseTemplate from "ts/interfaces/ICaseTemplate";
import UpdateTaskTemplateDrawer from "../UpdateTaskTemplateDrawer";
import "./styles.css";

const { TabPane } = Tabs;
const { Paragraph } = Typography;
const { Option } = Select;

interface Props {
  visible: boolean;
  handleClose: () => void;
  caseTemplateId: number | null /* ID of the case template to show. */;
}

interface OneTemplateData {
  caseTemplate: ICaseTemplate;
}

function UpdateCaseTemplateDrawer({
  visible,
  handleClose,
  caseTemplateId
}: Props) {
  const [openModal, setOpenModal] = useState<"CREATE_TASK_GROUP" | null>(null);

  // used to render a drawer if the user clicks on one of this CT's task templates
  const [idOfActiveTT, setIdOfActiveTT] = useState<number | null>(null);

  const [activeTab, setActiveTab] = useState<"info" | "tasks" | "members">(
    "info"
  );

  const { loading, error, data, refetch: refetchCaseTemplate } = useQuery<
    OneTemplateData
  >(GET_ONE_CASE_TEMPLATE, {
    variables: {
      id: caseTemplateId
    },
    fetchPolicy: "cache-and-network"
  });

  const [createTaskGroup] = useMutation(CREATE_A_TASK_GROUP, {
    onCompleted: () => {
      message.success("Created task group");

      // Close the modal if the task group is created successfully
      setOpenModal(null);
    },
    onError: error => {
      notification.error({
        message: "Failed to create task group",
        description: error.message
      });
    },
    refetchQueries: [
      { query: GET_ONE_CASE_TEMPLATE, variables: { id: caseTemplateId } }
    ]
  });

  const [updateCaseTemplate] = useMutation(UPDATE_CASE_TEMPLATE, {
    onCompleted: function() {
      message.success("Updated the template");
    },
    onError: function(error: ApolloError) {
      notification.error({
        message: "Could not update the template",
        description: error.message
      });
    },
    refetchQueries: [
      { query: GET_ONE_CASE_TEMPLATE, variables: { id: caseTemplateId } }
    ]
  });

  // ---

  const [userForm] = Form.useForm();

  const [addUserToCaseTemplate] = useMutation(ADD_USER_TO_CASE_TEMPLATE, {
    onCompleted: function() {
      message.success("Added user");
      userForm.resetFields();
    },
    onError: function(error: ApolloError) {
      notification.error({
        message: "Could not add user to the template",
        description: error.message
      });
    },
    refetchQueries: [
      { query: GET_ONE_CASE_TEMPLATE, variables: { id: caseTemplateId } }
    ]
  });

  const [removeUserFromCaseTemplate] = useMutation(
    REMOVE_USER_FROM_CASE_TEMPLATE,
    {
      onCompleted: function() {
        message.success("Removed user");
      },
      onError: function(error: ApolloError) {
        notification.error({
          message: "Could not remove user from the template",
          description: error.message
        });
      },
      refetchQueries: [
        { query: GET_ONE_CASE_TEMPLATE, variables: { id: caseTemplateId } }
      ]
    }
  );

  // ---

  const [groupForm] = Form.useForm();

  const [addGroupToCaseTemplate] = useMutation(ADD_GROUP_TO_CASE_TEMPLATE, {
    onCompleted: function() {
      message.success("Added group");
      groupForm.resetFields();
    },
    onError: function(error: ApolloError) {
      notification.error({
        message: "Could not add group to the template",
        description: error.message
      });
    },
    refetchQueries: [
      { query: GET_ONE_CASE_TEMPLATE, variables: { id: caseTemplateId } }
    ]
  });

  const [removeGroupFromCaseTemplate] = useMutation(
    REMOVE_GROUP_FROM_CASE_TEMPLATE,
    {
      onCompleted: function() {
        message.success("Removed group");
      },
      onError: function(error) {
        notification.error({
          message: "Could not remove group from the template",
          description: error.message
        });
      },
      refetchQueries: [
        {
          query: GET_ONE_CASE_TEMPLATE,
          variables: { id: caseTemplateId }
        }
      ]
    }
  );

  // ---

  const [updateTaskGroup] = useMutation(UPDATE_TASK_GROUP, {
    onCompleted: function() {
      message.success("Updated the task group");
    },
    onError: function(error: ApolloError) {
      notification.error({
        message: "An error occurred while updating the task group",
        description: error
      });
    },
    refetchQueries: [
      {
        query: GET_ONE_CASE_TEMPLATE,
        variables: { id: caseTemplateId }
      }
    ]
  });

  const [deleteTaskGroup] = useMutation(DELETE_A_TASK_GROUP, {
    onCompleted: function() {
      message.success("Deleted task group");
    },
    onError: function(error: ApolloError) {
      notification.error({
        message: "Could not delete this task group",
        description: error.message
      });
    },
    refetchQueries: [
      {
        query: GET_ONE_CASE_TEMPLATE,
        variables: { id: caseTemplateId }
      }
    ]
  });

  const [addTaskTemplateToTaskGroup] = useMutation(
    ADD_TASK_TEMPLATE_TO_TASK_GROUP,
    {
      onCompleted() {
        message.success("Added task template");

        // refresh our drawer and set our active tab to "Tasks"
        refetchCaseTemplate().then(() => setActiveTab("tasks"));
      },
      onError(error) {
        notification.error({
          message: "Failed to add task template",
          description: error.message
        });
      }
    }
  );

  const [removeTaskTemplateFromTaskGroup] = useMutation(
    REMOVE_TASK_TEMPLATE_FROM_TASK_GROUP,
    {
      onCompleted: function() {
        message.success("Removed task template");

        // refresh our drawer and set our active tab to "Tasks"
        refetchCaseTemplate().then(() => setActiveTab("tasks"));
      },
      onError: function(error) {
        notification.error({
          message: "Failed to remove task template",
          description: error.message
        });
      }
    }
  );

  const [changeRoleInCaseTemplate] = useMutation(CHANGE_ROLE_IN_CASE_TEMPLATE, {
    onCompleted: function() {
      message.success("Changed role");
    },
    onError: function(error: ApolloError) {
      notification.error({
        message: "Failed to change role",
        description: error.message
      });
    },
    refetchQueries: [
      {
        query: GET_ONE_CASE_TEMPLATE,
        variables: { id: caseTemplateId }
      }
    ]
  });

  // ---

  let drawerContent: React.ReactNode = null;
  if (loading) drawerContent = <Spin />;
  else if (error) {
    drawerContent = (
      <Error
        title="Couldn't retrieve template"
        subtitle={error ? error.message : ""}
      />
    );
  } else if (data) {
    const caseTemplate = data.caseTemplate;

    const taskGroups = caseTemplate.taskGroups.map(tgroup => (
      <TTGroup
        key={tgroup.id}
        taskGroup={tgroup}
        caseTemplate={caseTemplate}
        handleTTClicked={id => setIdOfActiveTT(id)}
        addTaskTemplate={taskTemplateId =>
          addTaskTemplateToTaskGroup({
            variables: {
              input: {
                taskTemplateId,
                caseTemplateId: caseTemplate.id,
                taskGroupId: tgroup.id
              }
            }
          })
        }
        removeTaskTemplate={taskTemplateId =>
          removeTaskTemplateFromTaskGroup({
            variables: {
              input: {
                taskTemplateId,
                caseTemplateId: caseTemplate.id,
                taskGroupId: tgroup.id
              }
            }
          })
        }
        renameTaskGroup={newName =>
          updateTaskGroup({
            variables: {
              input: {
                id: tgroup.id,
                name: newName
              }
            }
          })
        }
        deleteTaskGroup={() =>
          deleteTaskGroup({
            variables: {
              input: {
                id: tgroup.id
              }
            }
          })
        }
      />
    ));

    drawerContent = (
      // Note to self: don't change the keys for any of the tab pane below.
      // If I do, then search this file for the key and update all occurrences.
      <Tabs
        activeKey={activeTab}
        onChange={(newActiveTab: any) => setActiveTab(newActiveTab)}
      >
        <TabPane tab="Info" key="info">
          <CaseTemplateForm
            handleClose={handleClose}
            submitText="Update Template"
            initialValues={{
              name: caseTemplate.name,
              status: caseTemplate.status.name,
              priority: caseTemplate.priority.name,
              tags: caseTemplate.tags.map(tag => tag.name),
              description: caseTemplate.description,
              assignedTo:
                caseTemplate.assignedTo === null
                  ? null
                  : caseTemplate.assignedTo.username
            }}
            onFinish={values =>
              updateCaseTemplate({
                variables: {
                  input: {
                    id: caseTemplate.id,
                    name: values.name,
                    status: values.status,
                    priority: values.priority,
                    tags: values.tags,
                    description: values.description,
                    assignedTo: values.assignedTo
                  }
                }
              })
            }
          />
        </TabPane>
        <TabPane tab="Tasks" key="tasks">
          <Paragraph type="secondary">
            Cases created from this template will be populated with the tasks
            below.
          </Paragraph>
          <div>
            <Button
              type="link"
              style={{ padding: 0 }}
              onClick={() => setOpenModal("CREATE_TASK_GROUP")}
            >
              Create a task group
            </Button>
          </div>
          <div style={{ marginTop: "1em" }}>
            {taskGroups.length === 0 ? (
              <Empty
                description={
                  <div>
                    <h4>No task groups</h4>
                    <p>
                      You must create a task group above before you can add any
                      tasks
                    </p>
                  </div>
                }
              />
            ) : (
              <div>{taskGroups}</div>
            )}
          </div>
          <CreateTaskGroupModal
            visible={openModal === "CREATE_TASK_GROUP"}
            handleClose={() => setOpenModal(null)}
            handleFinish={newTaskGroupName =>
              createTaskGroup({
                variables: {
                  input: {
                    name: newTaskGroupName,
                    caseTemplateId: caseTemplate.id
                  }
                }
              })
            }
          />
        </TabPane>
        <TabPane tab="Members" key="members">
          <Paragraph type="secondary">
            Whenever a case is created from this template, the users and the
            members of the groups below will be added to it.
          </Paragraph>
          <div style={{ marginTop: "2em" }}>
            <h4>Users ({caseTemplate.defaultMemberCount})</h4>
            <Form
              form={userForm}
              colon={false}
              layout="vertical"
              style={{ display: "flex", marginTop: "1em" }}
              onFinish={values => {
                if (!values.usernames) return;
                values.usernames.forEach((username: string) =>
                  addUserToCaseTemplate({
                    variables: {
                      input: {
                        username: username,
                        role: "CAN_EDIT",
                        caseTemplateId: caseTemplate.id
                      }
                    }
                  })
                );
              }}
            >
              <Form.Item name="usernames" style={{ flex: "80%" }}>
                <UserSelect placeholder="Choose users" multiple />
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit">Add Users</Button>
              </Form.Item>
            </Form>
          </div>
          <div>
            {caseTemplate.defaultMemberCount === 0 ? (
              <Empty
                description={
                  <div>
                    <h4>No users</h4>
                    <Paragraph>Add users to this template above</Paragraph>
                  </div>
                }
              />
            ) : (
              <List<ICaseMember>
                bordered
                itemLayout="horizontal"
                dataSource={caseTemplate.defaultMembers}
                renderItem={member => (
                  <List.Item
                    actions={[
                      <Select<"CAN_VIEW" | "CAN_EDIT">
                        value={member.role}
                        style={{ width: "120px", marginRight: "1em" }}
                        onChange={newRole =>
                          changeRoleInCaseTemplate({
                            variables: {
                              input: {
                                role: newRole,
                                caseTemplateId: caseTemplate.id,
                                username: member.user.username
                              }
                            }
                          })
                        }
                      >
                        <Option value="CAN_VIEW">Can View</Option>
                        <Option value="CAN_EDIT">Can Edit</Option>
                      </Select>,
                      <Popconfirm
                        title="Remove this user?"
                        onConfirm={() =>
                          removeUserFromCaseTemplate({
                            variables: {
                              input: {
                                username: member.user.username,
                                caseTemplateId: caseTemplate.id
                              }
                            }
                          })
                        }
                      >
                        <Button type="link" icon={<CloseOutlined />} />
                      </Popconfirm>
                    ]}
                  >
                    <List.Item.Meta
                      title={member.user.username}
                      description={member.user.email}
                    />
                  </List.Item>
                )}
              />
            )}
          </div>
          <div style={{ marginTop: "2em" }}>
            <h4>Groups ({caseTemplate.defaultGroupCount})</h4>
            <Form
              colon={false}
              form={groupForm}
              layout="vertical"
              style={{ display: "flex", marginTop: "1em" }}
              onFinish={values => {
                if (!values.groupIds) return;
                values.groupIds.forEach((groupId: string) => {
                  addGroupToCaseTemplate({
                    variables: {
                      input: {
                        groupId,
                        caseTemplateId: caseTemplate.id,
                        role: "CAN_EDIT"
                      }
                    }
                  });
                });
              }}
            >
              <Form.Item name="groupIds" style={{ flex: "80%" }}>
                <GroupSelect placeholder="Choose groups" multiple />
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit">Add Groups</Button>
              </Form.Item>
            </Form>
          </div>
          <div>
            {caseTemplate.defaultGroupCount === 0 ? (
              <Empty
                description={
                  <div>
                    <h4>No groups</h4>
                    <Paragraph>Add groups to this template above</Paragraph>
                  </div>
                }
              />
            ) : (
              <List<ICaseGroup>
                bordered
                itemLayout="horizontal"
                dataSource={caseTemplate.defaultGroups}
                renderItem={dgroup => (
                  <List.Item
                    actions={[
                      <Select<"CAN_VIEW" | "CAN_EDIT">
                        value={dgroup.role}
                        style={{ width: "120px", marginRight: "1em" }}
                        onChange={newRole =>
                          changeRoleInCaseTemplate({
                            variables: {
                              input: {
                                role: newRole,
                                caseTemplateId: caseTemplate.id,
                                groupId: dgroup.group.id
                              }
                            }
                          })
                        }
                      >
                        <Option value="CAN_VIEW">Can View</Option>
                        <Option value="CAN_EDIT">Can Edit</Option>
                      </Select>,
                      <Popconfirm
                        title="Remove this group?"
                        onConfirm={() =>
                          removeGroupFromCaseTemplate({
                            variables: {
                              input: {
                                groupId: dgroup.group.id,
                                caseTemplateId: caseTemplate.id
                              }
                            }
                          })
                        }
                      >
                        <Button icon={<CloseOutlined />} type="link" />
                      </Popconfirm>
                    ]}
                  >
                    <List.Item.Meta
                      title={dgroup.group.name}
                      description={`${dgroup.group.userCount} users`}
                    />
                  </List.Item>
                )}
              />
            )}
          </div>
        </TabPane>
      </Tabs>
    );
  }

  return (
    <Drawer
      visible={visible}
      title={<h3>Update case template</h3>}
      width={700}
      maskClosable={false}
      keyboard={false}
      onClose={handleClose}
    >
      <>
        {drawerContent}
        <UpdateTaskTemplateDrawer
          visible={idOfActiveTT !== null}
          handleClose={() => setIdOfActiveTT(null)}
          templateId={idOfActiveTT}
          afterFinish={() => refetchCaseTemplate()}
        />
      </>
    </Drawer>
  );
}

export default UpdateCaseTemplateDrawer;
