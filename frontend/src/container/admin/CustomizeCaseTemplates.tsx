import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@apollo/react-hooks";
import {
  Button,
  Drawer,
  Empty,
  List,
  message,
  notification,
  Popconfirm,
  Spin,
  Typography
} from "antd";
import { ApolloError } from "apollo-boost";
import CaseTemplateForm from "container/admin/CaseTemplateForm";
import UpdateCaseTemplateDrawer from "container/admin/UpdateCaseTemplateDrawer";
import CREATE_A_CASE_TEMPLATE from "mutations/createCaseTemplate";
import DELETE_A_CASE_TEMPLATE from "mutations/deleteCaseTemplate";
import Error from "presentational/shared/errors/Error";
import GET_CASE_TEMPLATES from "queries/getCaseTemplates";
import React, { useState } from "react";
import ICaseTemplate from "ts/interfaces/ICaseTemplate";
import { formatDateOnly } from "utils/formatISO8601";

const { Paragraph } = Typography;

interface CaseTemplateData {
  caseTemplates: ICaseTemplate[];
}

function CustomizeCaseTemplates() {
  const { loading, data, error } = useQuery<CaseTemplateData>(
    GET_CASE_TEMPLATES
  );
  const [openDrawer, setOpenDrawer] = useState<
    "CREATE_CASE_TEMPLATE" | "UPDATE_CASE_TEMPLATE" | null
  >(null);

  // ID of the template to show in the drawer (for updating)
  const [activeTemplateId, setActiveTemplateId] = useState<number | null>(null);

  const [createCaseTemplate] = useMutation(CREATE_A_CASE_TEMPLATE, {
    onCompleted: () => {
      message.success("Created case template");

      // Close drawer after creating a C.T.
      setOpenDrawer(null);
      setActiveTemplateId(null);
    },
    onError: error => {
      notification.error({
        message: "Failed to create case template",
        description: error.message
      });
    }
  });

  const [deleteCaseTemplate] = useMutation(DELETE_A_CASE_TEMPLATE, {
    onCompleted: function() {
      message.success("Deleted the template");
    },
    onError: function(error: ApolloError) {
      notification.error({
        message: "Could not delete the template",
        description: error.message
      });
    }
  });

  if (loading) return <Spin />;
  else if (data) {
    return (
      <>
        {data.caseTemplates.length === 0 ? (
          <Empty
            description={
              <div style={{ marginTop: "1em" }}>
                <h3>No case templates</h3>
                <Paragraph>
                  Create case templates so you can quickly initialize cases from
                  them later.
                </Paragraph>
                <Button
                  icon={<PlusOutlined />}
                  onClick={() => setOpenDrawer("CREATE_CASE_TEMPLATE")}
                >
                  Create case template
                </Button>
              </div>
            }
          />
        ) : (
          <>
            <Button
              type="link"
              style={{ paddingLeft: 0 }}
              onClick={() => setOpenDrawer("CREATE_CASE_TEMPLATE")}
            >
              Create Template
            </Button>
            <div style={{ marginTop: "1em" }} />
            <List
              bordered
              itemLayout="horizontal"
              dataSource={data.caseTemplates}
              pagination={{ position: "bottom" }}
              renderItem={template => (
                <List.Item
                  actions={[
                    <Popconfirm
                      title="Delete this template?"
                      okText="Yes, Delete"
                      cancelText="No"
                      onConfirm={() =>
                        deleteCaseTemplate({
                          variables: {
                            input: {
                              id: template.id
                            }
                          },
                          refetchQueries: [{ query: GET_CASE_TEMPLATES }]
                        })
                      }
                    >
                      <Button type="link" icon={<DeleteOutlined />} />
                    </Popconfirm>
                  ]}
                >
                  <List.Item.Meta
                    title={
                      <a
                        onClick={() => {
                          setActiveTemplateId(template.id);
                          setOpenDrawer("UPDATE_CASE_TEMPLATE");
                        }}
                      >
                        {template.name}
                      </a>
                    }
                    description={`Created by ${
                      template.createdBy.username
                    } on ${formatDateOnly(template.createdAt)} (UTC)`}
                  />
                </List.Item>
              )}
            />
          </>
        )}
        <Drawer
          visible={openDrawer === "CREATE_CASE_TEMPLATE"}
          title={<h3>Create a case template</h3>}
          width={600}
          maskClosable={false}
          keyboard={false}
          onClose={() => setOpenDrawer(null)}
        >
          <CaseTemplateForm
            submitText="Create Template"
            handleClose={() => setOpenDrawer(null)}
            onFinish={values =>
              createCaseTemplate({
                variables: {
                  input: {
                    name: values.name,
                    status: values.status,
                    priority: values.priority,
                    tags: values.tags,
                    description: values.description,
                    assignedTo: values.assignedTo
                  }
                },
                refetchQueries: [{ query: GET_CASE_TEMPLATES }]
              })
            }
          />
        </Drawer>
        <UpdateCaseTemplateDrawer
          visible={
            openDrawer === "UPDATE_CASE_TEMPLATE" && activeTemplateId !== null
          }
          handleClose={() => setOpenDrawer(null)}
          templateId={activeTemplateId}
        />
      </>
    );
  } else if (error) {
    return (
      <Error title="Couldn't fetch case templates" subtitle={error.message} />
    );
  }
  return null;
}

export default CustomizeCaseTemplates;
