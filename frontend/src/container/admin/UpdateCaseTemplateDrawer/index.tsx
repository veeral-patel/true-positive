import { useMutation, useQuery } from "@apollo/react-hooks";
import {
  Button,
  Drawer,
  Empty,
  Form,
  List,
  message,
  notification,
  Spin,
  Tabs,
  Typography
} from "antd";
import { ApolloError } from "apollo-boost";
import CaseTemplateForm from "container/admin/CaseTemplateForm";
import UserSelect from "container/shared/users/UserSelect";
import ADD_USER_TO_CASE_TEMPLATE from "mutations/addUserToCaseTemplate";
import UPDATE_CASE_TEMPLATE from "mutations/updateCaseTemplate";
import Error from "presentational/shared/errors/Error";
import GET_ONE_CASE_TEMPLATE from "queries/getOneCaseTemplate";
import React from "react";
import ICaseMember from "ts/interfaces/ICaseMember";
import ICaseTemplate from "ts/interfaces/ICaseTemplate";
import "./styles.css";

const { TabPane } = Tabs;
const { Paragraph } = Typography;

interface Props {
  visible: boolean;
  handleClose: () => void;
  templateId: number | null /* ID of the case template to show. */;
}

interface OneTemplateData {
  caseTemplate: ICaseTemplate;
}

function UpdateCaseTemplateDrawer({ visible, handleClose, templateId }: Props) {
  const { loading, error, data } = useQuery<OneTemplateData>(
    GET_ONE_CASE_TEMPLATE,
    {
      variables: {
        id: templateId
      }
    }
  );

  const [updateCaseTemplate] = useMutation(UPDATE_CASE_TEMPLATE, {
    onCompleted: function() {
      message.success("Updated the template");
    },
    onError: function(error: ApolloError) {
      notification.error({
        message: "Could not update the template",
        description: error.message
      });
    }
  });

  const [addUserToCaseTemplate] = useMutation(ADD_USER_TO_CASE_TEMPLATE, {
    onCompleted: function() {
      message.success("Added user to the template");
    },
    onError: function(error: ApolloError) {
      notification.error({
        message: "Could not add user to the template",
        description: error.message
      });
    }
  });

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
    drawerContent = (
      <Tabs key="info">
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
        <TabPane tab="Members" key="members">
          <Paragraph type="secondary">
            Whenever a case is created from this template, the users and groups
            below will be added to the case.
          </Paragraph>
          <h4>Users ({caseTemplate.defaultUserCount})</h4>
          <Form
            colon={false}
            layout="vertical"
            style={{ display: "flex", marginTop: "2em" }}
            onFinish={values =>
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
              )
            }
          >
            <Form.Item
              name="usernames"
              style={{ flex: "80%" }}
              rules={[
                { required: true, message: "Please choose at least one user" }
              ]}
            >
              <UserSelect placeholder="Choose users" multiple />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit">Add Users</Button>
            </Form.Item>
          </Form>
          <div>
            {caseTemplate.defaultUserCount === 0 ? (
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
                  <List.Item>
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
            <h4>Groups</h4>
          </div>
        </TabPane>
      </Tabs>
    );
  }

  return (
    <Drawer
      visible={visible}
      title={<h3>Update a case template</h3>}
      width={600}
      maskClosable={false}
      keyboard={false}
      onClose={handleClose}
    >
      {drawerContent}
    </Drawer>
  );
}

export default UpdateCaseTemplateDrawer;
