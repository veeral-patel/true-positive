import { DeleteOutlined } from "@ant-design/icons";
import { MutationResult } from "@apollo/react-common";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { RouteComponentProps } from "@reach/router";
import {
  Button,
  Empty,
  Form,
  Input,
  List,
  message,
  Modal,
  notification,
  Popconfirm,
  Spin,
  Typography,
  Alert
} from "antd";
import { ApolloError } from "apollo-client";
import CREATE_AN_API_TOKEN from "mutations/createApiToken";
import DELETE_AN_API_TOKEN from "mutations/deleteApiToken";
import Error from "presentational/shared/errors/Error";
import GET_API_TOKENS from "queries/getApiTokens";
import React, { useState } from "react";
import IApiToken from "ts/interfaces/IApiToken";

const { Text, Paragraph } = Typography;

interface ResponseData {
  apiTokens: IApiToken[];
}

interface Props extends RouteComponentProps {}

function APITokensPage(props: Props) {
  const { loading, error, data } = useQuery<ResponseData>(GET_API_TOKENS);
  const [openModal, setOpenModal] = useState<"GENERATE_TOKEN" | null>(null);

  if (error) {
    notification.error({
      message: "Failed to fetch API tokens",
      description: error.message
    });
  }

  const [deleteApiToken] = useMutation(DELETE_AN_API_TOKEN, {
    onCompleted: function() {
      message.success("Deleted the API token");
    },
    onError: function(error: ApolloError) {
      notification.error({
        message: "Could not delete the API token",
        description: error.message
      });
    }
  });

  const [createApiToken] = useMutation(CREATE_AN_API_TOKEN, {
    onCompleted: function() {
      message.success("Generated API token");
      setOpenModal(null);
    },
    onError: function(error: ApolloError) {
      notification.error({
        message: "Could not generate an API token",
        description: error.message
      });
    }
  });

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3>API Tokens</h3>
        <Button onClick={() => setOpenModal("GENERATE_TOKEN")}>
          Generate Token
        </Button>
      </div>
      <div style={{ marginTop: "2em" }} />
      <Alert showIcon type="warning" message="Guard your tokens! They provide full access to your account." />
      <div style={{ marginTop: "2em" }} />
      {loading && <Spin size="large" />}
      {error && (
        <Error
          title="Failed to fetch API tokens"
          subtitle="Please check your Internet connection"
        />
      )}
      {data && data.apiTokens.length === 0 && (
        <Empty
          description={
            <div>
              <h3>No API tokens</h3>
              <Paragraph>Generate a token to start using the API.</Paragraph>
            </div>
          }
        />
      )}
      {data && data.apiTokens.length >= 1 && (
          <List<IApiToken>
            bordered
            dataSource={data.apiTokens}
            renderItem={apiToken => (
              <List.Item
                actions={[
                  <Popconfirm
                    title="Delete this API token?"
                    okText="Yes, Delete"
                    cancelText="No"
                    onConfirm={() =>
                      deleteApiToken({
                        variables: {
                          input: {
                            id: apiToken.id
                          }
                        },
                        refetchQueries: function(result: MutationResult) {
                          return [{ query: GET_API_TOKENS }];
                        }
                      })
                    }
                  >
                    <Button type="link" icon={<DeleteOutlined />} />
                  </Popconfirm>
                ]}
              >
                <List.Item.Meta
                  title={apiToken.name}
                  description={<Text copyable>{apiToken.apiToken}</Text>}
                />
              </List.Item>
            )}
          />
      )}
      <Modal
        visible={openModal === "GENERATE_TOKEN"}
        onCancel={() => setOpenModal(null)}
        title="Generate Token"
        footer={null}
        destroyOnClose={true}
      >
        <Form
          layout="vertical"
          colon={false}
          onFinish={values =>
            createApiToken({
              variables: {
                input: {
                  name: values.name
                }
              },
              refetchQueries: [{ query: GET_API_TOKENS }]
            })
          }
        >
          <Form.Item
            label="Name your token"
            name="name"
            rules={[{ required: true, message: "Please name this token" }]}
          >
            <Input placeholder="Test token" />
          </Form.Item>
          <Form.Item>
            <div style={{ float: "right" }}>
              <Button style={{ marginRight: "0.75em" }}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                Generate Token
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default APITokensPage;
