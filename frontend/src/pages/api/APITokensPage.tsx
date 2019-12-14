import { DeleteOutlined } from "@ant-design/icons";
import { MutationResult } from "@apollo/react-common";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { RouteComponentProps } from "@reach/router";
import {
  Button,
  Empty,
  List,
  message,
  Modal,
  notification,
  Popconfirm,
  Spin,
  Typography
} from "antd";
import { ApolloError } from "apollo-client";
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

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3>API Tokens</h3>
        <Button onClick={() => setOpenModal("GENERATE_TOKEN")}>
          Generate Token
        </Button>
      </div>
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
        <>
          <div style={{ marginTop: "2em" }} />
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
          <Modal
            visible={openModal === "GENERATE_TOKEN"}
            onCancel={() => setOpenModal(null)}
            title="Generate token"
          ></Modal>
        </>
      )}
    </>
  );
}

export default APITokensPage;
