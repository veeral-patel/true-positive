import { useMutation, useQuery } from "@apollo/react-hooks";
import { Drawer, message, notification, Spin, Tabs, Typography } from "antd";
import { ApolloError } from "apollo-boost";
import CaseTemplateForm from "container/admin/CaseTemplateForm";
import UPDATE_CASE_TEMPLATE from "mutations/updateCaseTemplate";
import Error from "presentational/shared/errors/Error";
import GET_ONE_CASE_TEMPLATE from "queries/getOneCaseTemplate";
import React from "react";
import ICaseTemplate from "ts/interfaces/ICaseTemplate";

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
      handleClose();
    },
    onError: function(error: ApolloError) {
      notification.error({
        message: "Could not update the template",
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
    drawerContent = (
      <Tabs key="info">
        <TabPane tab="Info" key="info">
          <CaseTemplateForm
            handleClose={handleClose}
            submitText="Update Template"
            initialValues={{
              name: data.caseTemplate.name,
              status: data.caseTemplate.status.name,
              priority: data.caseTemplate.priority.name,
              tags: data.caseTemplate.tags.map(tag => tag.name),
              description: data.caseTemplate.description,
              assignedTo:
                data.caseTemplate.assignedTo === null
                  ? null
                  : data.caseTemplate.assignedTo.username
            }}
            onFinish={values =>
              updateCaseTemplate({
                variables: {
                  input: {
                    id: data.caseTemplate.id,
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
            The users and groups below will be added to cases created from this
            template.
          </Paragraph>
          <h4>Users ({data.caseTemplate.defaultUserCount})</h4>
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
