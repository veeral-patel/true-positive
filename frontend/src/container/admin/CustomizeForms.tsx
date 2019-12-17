import { useQuery } from "@apollo/react-hooks";
import { Button, Drawer, Form, Input, Tabs } from "antd";
import gql from "graphql-tag";
import React, { useState } from "react";
import IForm from "ts/interfaces/IForm";

const { TabPane } = Tabs;

const GET_FORMS = gql`
  query forms {
    id
    name
    createdAt
    createdBy {
      username
    }
  }
`;

interface FormListData {
  forms: IForm[]
}

function CustomizeForms() {
  const [openDrawer, setOpenDrawer] = useState<"CREATE_FORM" | null>(null);
  const { loading, data } = useQuery<FormListData>(GET_FORMS);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3>Forms</h3>
        <Button onClick={() => setOpenDrawer("CREATE_FORM")}>
          Create Form
        </Button>
      </div>
      <Drawer
        visible={openDrawer === "CREATE_FORM"}
        title={<h3>Create a form</h3>}
        width={600}
        maskClosable={false}
        keyboard={false}
        onClose={() => setOpenDrawer(null)}
      >
        <Tabs defaultActiveKey="json_schema">
          <TabPane tab="JSON Schema" key="json_schema">
            <Form
              colon={false}
              layout="vertical"
              style={{ marginTop: "0.5em" }}
            >
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: "Please name your form" }]}
              >
                <Input placeholder="Live response findings" />
              </Form.Item>
            </FormListData>
          </TabPane>
        </Tabs>
      </Drawer>
    </>
  );
}

export default CustomizeForms;
