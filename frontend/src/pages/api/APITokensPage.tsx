import { DeleteOutlined } from "@ant-design/icons";
import { useQuery } from "@apollo/react-hooks";
import { RouteComponentProps } from "@reach/router";
import { Button, Empty, List, notification, Popconfirm, Spin, Typography } from "antd";
import Error from "presentational/shared/errors/Error";
import GET_API_TOKENS from "queries/getApiTokens";
import React from "react";
import IApiToken from "ts/interfaces/IApiToken";

const { Text, Paragraph } = Typography;

interface ResponseData {
  apiTokens: IApiToken[];
}

interface Props extends RouteComponentProps {}

function APITokensPage(props: Props) {
  const { loading, error, data } = useQuery<ResponseData>(GET_API_TOKENS);

  // Show more descriptive error in a notification in addition to rendering
  // a error component in the UI.
  if (error) {
    notification.error({
      message: "Failed to fetch API tokens",
      description: error.message
    });
  }

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3>API Tokens</h3>
        <Button>Generate Token</Button>
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
        </>
      )}
    </>
  );
}

export default APITokensPage;
