import { useMutation } from "@apollo/react-hooks";
import { navigate } from "@reach/router";
import { Button, Form, Input, message, Modal, notification } from "antd";
import { ApolloError } from "apollo-boost";
import DELETE_A_CASE from "mutations/deleteCase";
import GET_CASES from "queries/getCases";
import React, { useState } from "react";
import { paths } from "utils/constants";

interface Props {
  visible: boolean;
  onCancel: () => void;
  caseId: number;
}

function DeleteCaseModal({ visible, onCancel, caseId }: Props) {
  const [confirmationTextIsValid, setConfirmationTextIsValid] = useState(false);

  const [deleteCase] = useMutation(DELETE_A_CASE, {
    onCompleted: function() {
      message.success("Deleted the case");
      navigate(paths.ROOT_PATH);
    },
    onError: function(error: ApolloError) {
      notification.error({
        message: "An error occurred while deleting the case",
        description: error.message
      });
    },
    refetchQueries: [{ query: GET_CASES }]
  });

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      title="Delete this case"
      footer={null}
    >
      <div>
        Deleting this case will delete its indicators and tasks as well (but not
        any merged cases). This action cannot be undone.
      </div>
      <div style={{ marginTop: "1em" }}>Type "DELETE ME" below to confirm.</div>
      <div style={{ marginTop: "1em" }}>
        <Form
          colon={false}
          layout="vertical"
          onFinish={values =>
            deleteCase({
              variables: {
                input: {
                  id: caseId
                }
              }
            })
          }
        >
          <Form.Item name="confirmation_text">
            <Input
              placeholder="DELETE ME"
              onChange={event => {
                const inputValue = event.currentTarget.value;
                if (inputValue === "DELETE ME") {
                  setConfirmationTextIsValid(true);
                } else {
                  setConfirmationTextIsValid(false);
                }
              }}
            />
          </Form.Item>
          <Form.Item>
            <div style={{ float: "right" }}>
              <Button style={{ marginRight: "0.5em" }} onClick={onCancel}>
                Cancel
              </Button>
              <Button
                type="danger"
                htmlType="submit"
                disabled={!confirmationTextIsValid}
              >
                Delete Case
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
}

export default DeleteCaseModal;
