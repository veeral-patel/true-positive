import { DeleteOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@apollo/react-hooks";
import {
  Button,
  Drawer,
  Empty,
  Form,
  Input,
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
import React, { useState } from "react";
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

  const [idOfOpenDrawer, setIdOfOpenDrawer] = useState<number | null>(null);

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
                  title={
                    <Text copyable>
                      <a
                        onClick={() => setIdOfOpenDrawer(emailAddress.id)}
                        style={{ color: "inherit" }}
                      >
                        {emailAddress.email}
                      </a>
                    </Text>
                  }
                />
              </List.Item>
            )}
          />
          <Drawer
            visible={idOfOpenDrawer !== null}
            onClose={() => setIdOfOpenDrawer(null)}
            title={<h3>Update inbound address</h3>}
            width={600}
          >
            <Form colon={false} layout="vertical">
              <Form.Item label="Inbound Address" name="inbound_address">
                <Input disabled />
              </Form.Item>
            </Form>
          </Drawer>
        </>
      );
    }
  }
  return null;
}

export default ListOfCreateCaseEmailAddresses;
