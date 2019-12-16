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
  Spin
} from "antd";
import { ApolloError } from "apollo-boost";
import CaseTemplateForm from "container/admin/CaseTemplateForm";
import UpdateCaseTemplateDrawer from "container/admin/UpdateCaseTemplateDrawer";
import DELETE_A_CASE_TEMPLATE from "mutations/deleteCaseTemplate";
import Error from "presentational/shared/errors/Error";
import GET_CASE_TEMPLATES from "queries/getCaseTemplates";
import React, { useState } from "react";
import ICaseTemplate from "ts/interfaces/ICaseTemplate";
import { formatDateOnly } from "utils/formatISO8601";

interface CaseTemplateData {
  caseTemplates: ICaseTemplate[];
}

function CustomizeCaseTemplates() {
  const { loading, data } = useQuery<CaseTemplateData>(GET_CASE_TEMPLATES);
  const [openDrawer, setOpenDrawer] = useState<
    "CREATE_CASE_TEMPLATE" | "UPDATE_CASE_TEMPLATE" | null
  >(null);

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
                      <a onClick={() => setOpenDrawer("UPDATE_CASE_TEMPLATE")}>
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
          <CaseTemplateForm handleClose={() => setOpenDrawer(null)} />
        </Drawer>
        <UpdateCaseTemplateDrawer
          visible={openDrawer === "UPDATE_CASE_TEMPLATE"}
          handleClose={() => setOpenDrawer(null)}
        />
      </>
    );
  } else {
    return (
      <Error
        title="Couldn't fetch case templates"
        subtitle="Please check your Internet connection"
      />
    );
  }
}

export default CustomizeCaseTemplates;
