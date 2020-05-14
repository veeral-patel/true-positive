import { useMutation, useQuery } from "@apollo/react-hooks";
import { Drawer, message, notification, Spin } from "antd";
import CCEmailAddressForm from "container/admin/CCEmailAddressForm";
import UPDATE_CREATE_CASE_EMAIL_ADDRESS from "mutations/updateCreateCaseEmailAddress";
import Error from "presentational/shared/errors/Error";
import GET_ONE_CC_EMAIL_ADDRESS from "queries/getOneCreateCaseEmailAddress";
import React from "react";
import ICreateCaseEmailAddress from "ts/interfaces/ICreateCaseEmailAddress";

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

  const [updateCreateCaseEmailAddress] = useMutation(
    UPDATE_CREATE_CASE_EMAIL_ADDRESS,
    {
      onCompleted() {
        message.success("Updated inbound address");
      },
      onError(error) {
        notification.error({
          message: "Failed to update inbound address",
          description: error.message
        });
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
      <CCEmailAddressForm
        onClose={onClose}
        onFinish={values =>
          updateCreateCaseEmailAddress({
            variables: {
              input: {
                id: ccEmailAddressId,
                caseTemplateId: values.case_template_id,
                defaultCreator: values.default_creator
              }
            }
          })
        }
        initialValues={{
          case_template_id: data.createCaseEmailAddress.caseTemplate.id,
          default_creator: data.createCaseEmailAddress.defaultCreator.username
        }}
        submitText="Update Address"
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
