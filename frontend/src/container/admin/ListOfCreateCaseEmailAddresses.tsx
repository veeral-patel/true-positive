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
import DELETE_CREATE_CASE_EMAIL_ADDRESS from "mutations/deleteCreateCaseEmailAddress";
import Error from "presentational/shared/errors/Error";
import GET_CREATE_CASE_EMAIL_ADDRESSES from "queries/getCreateCaseEmailAddresses";
import React, { useState } from "react";
import ICreateCaseEmailAddress from "ts/interfaces/ICreateCaseEmailAddress";
import { formatDateOnly } from "utils/formatISO8601";

const { Paragraph, Text } = Typography;

interface Response {
  createCaseEmailAddresses: ICreateCaseEmailAddress[];
}

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
                Create one above to start creating cases via email
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
                  description={`Created by ${
                    emailAddress.createdBy.username
                  } on ${formatDateOnly(emailAddress.createdAt)} (UTC)`}
                />
              </List.Item>
            )}
          />
          {/* <UpdateCCEmailAddressDrawer
            visible={idOfOpenDrawer !== null}
            onClose={() => setIdOfOpenDrawer(null)}
            ccEmailAddressId={idOfOpenDrawer}
          /> */}
        </>
      );
    }
  }
  return null;
}

export default ListOfCreateCaseEmailAddresses;
