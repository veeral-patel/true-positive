import { UserOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@apollo/react-hooks";
import {
  Alert,
  AutoComplete,
  Button,
  Form,
  Input,
  message,
  Modal,
  notification,
  Select
} from "antd";
import { ApolloError } from "apollo-boost";
import { inject, observer } from "mobx-react";
import MERGE_A_CASE from "mutations/mergeCase";
import GET_CASE_NAMES from "queries/getCaseNames";
import React from "react";
import ActiveCaseStore from "stores/ActiveCaseStore";
import UIStore from "stores/UIStore";
import ICase from "ts/interfaces/ICase";

const { Option } = Select;
const { TextArea } = Input;

interface FormProps {
  uiStore?: UIStore;
  activeCaseStore?: ActiveCaseStore;
}

// ---

interface CaseNameData {
  /* we only have the ID and name for each case (as of 11/24/19) */
  cases: ICase[];
}

const MergeCaseForm = inject(
  "uiStore",
  "activeCaseStore"
)(
  observer(function InnerForm(props: FormProps) {
    const { uiStore, activeCaseStore } = props;

    const activeCase = activeCaseStore!.activeCase;

    const [mergeCase] = useMutation(MERGE_A_CASE, {
      onCompleted: function() {
        message.success("Merged the case");
        uiStore!.closeModal();
        activeCaseStore!.loadActiveCase();
      },
      onError: function(error: ApolloError) {
        notification.error({
          message: "Could not merge this case",
          description: error.message
        });
      }
    });

    // populate our list of case options
    const { error, loading, data } = useQuery<CaseNameData>(GET_CASE_NAMES);

    let caseOptions: any[] = [];

    if (loading) {
      caseOptions = [
        <Option key="loading" value="loading">
          Loading...
        </Option>
      ];
    } else if (error) {
      caseOptions = [
        <Option key="error" value="error">
          Failed to fetch cases
        </Option>
      ];
    } else if (data) {
      caseOptions = data.cases.map(theCase => (
        <Option key={theCase.id} value={theCase.id}>
          {theCase.name}
        </Option>
      ));
    }

    // render the form
    return (
      <Form
        colon={false}
        layout="vertical"
        onFinish={values => {
          if (activeCase) {
            mergeCase({
              variables: {
                input: {
                  childCaseId: activeCase.id,
                  parentCaseId: values.parentCase,
                  reason: values.reason
                }
              }
            });
          }
        }}
      >
        <Form.Item
          label="Case to merge this case into"
          name="parentCase"
          rules={[{ required: true, message: "Please select a case" }]}
        >
          <AutoComplete
            dataSource={caseOptions}
            defaultActiveFirstOption={true}
            optionFilterProp="children"
          >
            <Input prefix={<UserOutlined />} placeholder="Filter cases" />
          </AutoComplete>
        </Form.Item>
        <Form.Item label="Reason" name="reason">
          <TextArea placeholder="Describe how the two cases are related" />
        </Form.Item>
        <Form.Item>
          <div style={{ float: "right" }}>
            <Button
              style={{ marginRight: "0.5em" }}
              onClick={() => uiStore!.closeModal()}
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Merge Case
            </Button>
          </div>
        </Form.Item>
      </Form>
    );
  })
);

// ---

interface Props {
  uiStore?: UIStore;
}

export default inject("uiStore")(
  observer(
    class MergeOneCaseModal extends React.Component<Props> {
      render() {
        const { uiStore } = this.props;
        return (
          <Modal
            title="Merge Case"
            visible={uiStore!.openModal === "MERGE_ONE_CASE_MODAL"}
            onCancel={() => uiStore!.closeModal()}
            destroyOnClose={true}
            keyboard={false}
            footer={null}
          >
            <Alert
              type="info"
              showIcon
              message="Merging this case will simply mark this case as merged. It will
              not modify this case or the parent case at all."
            />
            <div style={{ marginTop: "1em" }} />
            <MergeCaseForm />
          </Modal>
        );
      }
    }
  )
);
