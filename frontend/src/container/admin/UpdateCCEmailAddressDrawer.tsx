import { useQuery } from "@apollo/react-hooks";
import { Drawer, Spin } from "antd";
import Error from "presentational/shared/errors/Error";
import GET_ONE_CC_EMAIL_ADDRESS from "queries/getOneCreateCaseEmailAddress";
import React from "react";
import ICreateCaseEmailAddress from "ts/interfaces/ICreateCaseEmailAddress";
import CCEmailAddressForm from "./CCEmailAddressForm";

interface Props {
  visible: boolean;
  onClose: () => void;
  ccEmailAddressId: number | null;
}

interface Response {
  createCaseEmailAddress: ICreateCaseEmailAddress;
}

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
      // initialValues={{
      // }}
      <CCEmailAddressForm
        onClose={onClose}
        onFinish={() => void 0}
        initialValues={{
          // email: data.createCaseEmailAddress.email,
          case_template_id: data.createCaseEmailAddress.caseTemplate.id,
          default_creator: data.createCaseEmailAddress.createdBy.username
        }}
      />
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
