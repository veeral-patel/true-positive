import { PlusOutlined } from "@ant-design/icons";
import { useQuery } from "@apollo/react-hooks";
import {
  Button,
  Drawer,
  Empty,
  Form,
  Input,
  List,
  Spin,
  Typography
} from "antd";
import Error from "presentational/shared/errors/Error";
import GET_FORMS from "queries/getForms";
import React, { useState } from "react";
import IForm from "ts/interfaces/IForm";
import { formatDateOnly } from "utils/formatISO8601";

const { Paragraph } = Typography;

interface FormListData {
  forms: IForm[];
}

function CustomizeForms() {
  const [createFormDrawerIsOpen, toggleCreateFormDrawer] = useState<boolean>(
    false
  );

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
              <Paragraph>
                Define forms so you can structure the data in your cases.
              </Paragraph>
              <Button
                icon={<PlusOutlined />}
                onClick={() => toggleCreateFormDrawer(true)}
              >
                Create form
              </Button>
            </div>
          }
        />
      )}
      {data && data.forms.length >= 1 && (
        <>
          <Button
            type="link"
            style={{ paddingLeft: 0 }}
            onClick={() => toggleCreateFormDrawer(true)}
          >
            Create Form
          </Button>
          <div style={{ marginTop: "1em" }} />
          <List<IForm>
            bordered
            dataSource={data.forms}
            itemLayout="horizontal"
            renderItem={form => (
              <List.Item>
                <List.Item.Meta
                  title={<a>{form.name}</a>}
                  description={`Created by ${
                    form.createdBy.username
                  } on ${formatDateOnly(form.createdAt)} (UTC)`}
                />
              </List.Item>
            )}
          />
        </>
      )}
      {error && (
        <Error title="Could not fetch forms" subtitle={error.message} />
      )}
      <Drawer
        visible={createFormDrawerIsOpen}
        title={<h3>Create a form</h3>}
        width={600}
        maskClosable={false}
        keyboard={false}
        onClose={() => toggleCreateFormDrawer(false)}
      >
        <Form colon={false} layout="vertical" style={{ marginTop: "0.5em" }}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please name your form" }]}
          >
            <Input placeholder="Live response findings" />
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}

export default CustomizeForms;
