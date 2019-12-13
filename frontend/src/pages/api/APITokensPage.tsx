import { useQuery } from "@apollo/react-hooks";
import { RouteComponentProps } from "@reach/router";
import {
  Alert,
  Button,
  Empty,
  List,
  notification,
  Spin,
  Typography
} from "antd";
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
          <Alert
            showIcon
            type="warning"
            message="Guard your tokens! They provide full access to your account."
          />
          <List<IApiToken>
            dataSource={data.apiTokens}
            renderItem={apiToken => (
              <List.Item>
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
