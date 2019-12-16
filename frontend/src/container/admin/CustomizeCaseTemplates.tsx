import { PlusOutlined } from "@ant-design/icons";
import { useQuery } from "@apollo/react-hooks";
import { Button, Drawer, Empty, List, Spin } from "antd";
import CaseTemplateForm from "container/admin/CaseTemplateForm";
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
  const [openDrawer, setOpenDrawer] = useState<"CREATE_CASE_TEMPLATE" | null>(
    null
  );

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
                <List.Item>
                  <List.Item.Meta
                    title={<a>{template.name}</a>}
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
