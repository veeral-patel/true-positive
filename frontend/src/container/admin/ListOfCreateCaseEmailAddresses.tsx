import { DeleteOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@apollo/react-hooks";
import {
  Button,
  Empty,
  List,
  message,
  notification,
  Popconfirm,
  Spin,
  Typography
} from "antd";
import gql from "graphql-tag";
import Error from "presentational/shared/errors/Error";
import GET_CREATE_CASE_EMAIL_ADDRESSES from "queries/getCreateCaseEmailAddresses";
import React from "react";
import ICreateCaseEmailAddress from "ts/interfaces/ICreateCaseEmailAddress";

const { Paragraph, Text } = Typography;

interface Response {
  createCaseEmailAddresses: ICreateCaseEmailAddress[];
}

const DELETE_CREATE_CASE_EMAIL_ADDRESS = gql`
  mutation deleteCreateCaseEmailAddress(
    $input: DeleteCreateCaseEmailAddressInput!
  ) {
    deleteCreateCaseEmailAddress(input: $input) {
      id
    }
  }
`;

function ListOfCreateCaseEmailAddresses() {
  const { loading, error, data } = useQuery<Response>(
    GET_CREATE_CASE_EMAIL_ADDRESSES
  );

  const [deleteInboundAddress] = useMutation(DELETE_CREATE_CASE_EMAIL_ADDRESS, {
    onCompleted: function() {
      message.success("Deleted inbound address");
    },
    onError: function(error) {
      notification.error({
        message: "Failed to delete inbound address",
        description: error.message
      });
    },
    refetchQueries: [{ query: GET_CREATE_CASE_EMAIL_ADDRESSES }]
  });

  if (loading) return <Spin />;
  else if (error) {
    return (
      <Error
        title="Could not fetch inbound email addresses"
        subtitle={error.message}
      />
    );
  } else if (data) {
    const numberOfEmails = data.createCaseEmailAddresses.length;
    if (numberOfEmails === 0) {
      return (
        <Empty
          description={
            <div>
              <h4>No inbound email addresses</h4>
              <Paragraph>
                Generate one above to start creating cases via email
              </Paragraph>
            </div>
          }
        />
      );
    } else {
      return (
        <>
          <List
            bordered
            dataSource={data.createCaseEmailAddresses}
            itemLayout="horizontal"
            renderItem={emailAddress => (
              <List.Item
                key={emailAddress.id}
                actions={[
                  <Popconfirm
                    title="Delete this inbound address?"
                    onConfirm={() =>
                      deleteInboundAddress({
                        variables: {
                          input: {
                            id: emailAddress.id
                          }
                        }
                      })
                    }
                  >
                    <Button icon={<DeleteOutlined />} type="link" />
                  </Popconfirm>
                ]}
              >
                <List.Item.Meta
                  title={<Text copyable>{emailAddress.email}</Text>}
                />
              </List.Item>
            )}
          />
        </>
      );
    }
  }
  return null;
}

export default ListOfCreateCaseEmailAddresses;
