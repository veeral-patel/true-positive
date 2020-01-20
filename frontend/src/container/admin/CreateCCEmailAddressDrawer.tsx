import { useMutation } from "@apollo/react-hooks";
import { Drawer, message, notification } from "antd";
import CREATE_CREATE_CASE_EMAIL_ADDRESS from "mutations/createCreateCaseEmailAddress";
import GET_CREATE_CASE_EMAIL_ADDRESSES from "queries/getCreateCaseEmailAddresses";
import React from "react";
import CCEmailAddressForm from "./CCEmailAddressForm";

interface Props {
  visible: boolean;
  onClose: () => void;
}

function CreateCCEmailAddressDrawer({ visible, onClose }: Props) {
  const [createInboundAddress] = useMutation(CREATE_CREATE_CASE_EMAIL_ADDRESS, {
    onCompleted: function() {
      message.success("Created inbound address");
      onClose();
    },
    onError: function(error) {
      notification.error({
        message: "Failed to create inbound address",
        description: error.message
      });
    },
    refetchQueries: [{ query: GET_CREATE_CASE_EMAIL_ADDRESSES }]
  });

  return (
    <Drawer
      visible={visible}
      onClose={onClose}
      title={<h3>Create an inbound address</h3>}
      width={600}
    >
      <CCEmailAddressForm
        onClose={onClose}
        submitText="Create Address"
        onFinish={values =>
          createInboundAddress({
            variables: {
              input: {
                caseTemplateId: values.case_template_id,
                defaultCreator: values.default_creator
              }
            }
          })
        }
      />
    </Drawer>
  );
}

export default CreateCCEmailAddressDrawer;
