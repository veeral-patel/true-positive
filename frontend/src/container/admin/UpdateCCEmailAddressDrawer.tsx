import { useQuery } from "@apollo/react-hooks";
import { Drawer, Form, Input, Spin } from "antd";
import gql from "graphql-tag";
import Error from "presentational/shared/errors/Error";
import React from "react";
import ICreateCaseEmailAddress from "ts/interfaces/ICreateCaseEmailAddress";
import CaseTemplateSelect from "./CaseTemplateSelect";

interface Props {
  visible: boolean;
  onClose: () => void;
  ccEmailAddressId: number | null;
}

interface Response {
  createCaseEmailAddress: ICreateCaseEmailAddress;
}

const GET_ONE_CC_EMAIL_ADDRESS = gql`
  query createCaseEmailAddress($id: ID!) {
    createCaseEmailAddress(id: $id) {
      id
      email
    }
  }
`;

function UpdateCCEmailAddressDrawer({
  visible,
  onClose,
  ccEmailAddressId
}: Props) {
  const { loading, error, data } = useQuery<Response>(
    GET_ONE_CC_EMAIL_ADDRESS,
    {
      variables: {
        id: ccEmailAddressId
      }
    }
  );

  let drawerContent: React.ReactNode = null;

  if (loading) drawerContent = <Spin />;
  else if (error) {
    drawerContent = (
      <Error
        title="Could not retrieve inbound address"
        subtitle={error.message}
      />
    );
  } else if (data) {
    drawerContent = (
      <Form
        colon={false}
        layout="vertical"
        initialValues={{ email: data.createCaseEmailAddress.email }}
      >
        <Form.Item label="Email" name="email">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Case Template" name="case_template">
          <CaseTemplateSelect />
        </Form.Item>
      </Form>
    );
  }

  return (
    <Drawer
      visible={visible}
      onClose={onClose}
      title={<h3>Update inbound address</h3>}
      width={600}
    >
      {drawerContent}
    </Drawer>
  );
}

export default UpdateCCEmailAddressDrawer;
