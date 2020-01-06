import { useQuery } from "@apollo/react-hooks";
import { Button, Form, Spin, Typography } from "antd";
import StatusSelect from "container/shared/statuses/StatusSelect";
import gql from "graphql-tag";
import Error from "presentational/shared/errors/Error";
import React from "react";
import IStatus from "ts/interfaces/IStatus";

const { Paragraph } = Typography;

const GET_DEFAULT_STATUS = gql`
  query {
    defaultStatus {
      name
    }
  }
`;

interface Response {
  defaultStatus: IStatus;
}

function DefaultStatusSection() {
  const { data, loading, error } = useQuery<Response>(GET_DEFAULT_STATUS);

  return (
    <>
      <Paragraph>Default Status</Paragraph>
      <Paragraph type="secondary">
        If you don't want to choose a status each time you create a case, choose
        a default status below.
      </Paragraph>
      <Paragraph type="secondary">
        Then, the UI will pre-populate the status field with the default status
        you chose.
      </Paragraph>
      {loading && <Spin />}
      {data && (
        <Form
          colon={false}
          layout="horizontal"
          style={{ display: "flex" }}
          initialValues={{ defaultStatus: data.defaultStatus.name }}
        >
          <Form.Item
            name="defaultStatus"
            style={{ width: "300px", marginRight: "0.5em" }}
          >
            <StatusSelect includeNone={true} />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">Update</Button>
          </Form.Item>
        </Form>
      )}
      {error && (
        <Error
          title="Could not retrieve your tenant's default status"
          subtitle={error.message}
        />
      )}
    </>
  );
}

export default DefaultStatusSection;
