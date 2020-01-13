import { DeleteOutlined } from "@ant-design/icons";
import { useQuery } from "@apollo/react-hooks";
import { Button, Empty, List, Popconfirm, Spin, Typography } from "antd";
import Error from "presentational/shared/errors/Error";
import GET_CREATE_CASE_EMAIL_ADDRESSES from "queries/getCreateCaseEmailAddresses";
import React from "react";
import ICreateCaseEmailAddress from "ts/interfaces/ICreateCaseEmailAddress";

const { Paragraph, Text } = Typography;

interface Response {
  createCaseEmailAddresses: ICreateCaseEmailAddress[];
}

function ListOfCreateCaseEmailAddresses() {
  const { loading, error, data } = useQuery<Response>(
    GET_CREATE_CASE_EMAIL_ADDRESSES
  );
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
                  <Popconfirm title="Delete this inbound address?">
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
