import { PlusOutlined } from "@ant-design/icons";
import { useQuery } from "@apollo/react-hooks";
import {
  Button,
  Drawer,
  Empty,
  Form,
  Input,
  Spin,
  Tabs,
  Typography
} from "antd";
import gql from "graphql-tag";
import Error from "presentational/shared/errors/Error";
import React, { useState } from "react";
import IForm from "ts/interfaces/IForm";

const { TabPane } = Tabs;
const { Paragraph } = Typography;

const GET_FORMS = gql`
  query {
    forms {
      id
      name
      createdAt
      createdBy {
        username
      }
    }
  }
`;

interface FormListData {
  forms: IForm[];
}

function CustomizeForms() {
  const [openDrawer, setOpenDrawer] = useState<"CREATE_FORM" | null>(null);
  const { loading, data, error } = useQuery<FormListData>(GET_FORMS);

  return (
    <>
      <h3>Forms</h3>
      {loading && <Spin />}
      {data && data.forms.length === 0 && (
        <Empty
          description={
            <div style={{ marginTop: "1em" }}>
              <h3>No forms</h3>
              <Paragraph>Use forms to structure data in cases.</Paragraph>
              <Button
                icon={<PlusOutlined />}
                onClick={() => setOpenDrawer("CREATE_FORM")}
              >
                Create form
              </Button>
            </div>
          }
        />
      )}
      {error && (
        <Error title="Could not fetch forms" subtitle={error.message} />
      )}
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
            </Form>
          </TabPane>
        </Tabs>
      </Drawer>
    </>
  );
}

export default CustomizeForms;
