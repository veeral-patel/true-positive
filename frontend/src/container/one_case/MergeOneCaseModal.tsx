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
import { DataSourceItemType } from "antd/lib/auto-complete";
import { FormComponentProps } from "antd/lib/form";
import { WrappedFormUtils } from "antd/lib/form/Form";
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
  form: WrappedFormUtils;
  uiStore?: UIStore;
  activeCaseStore?: ActiveCaseStore;
}

// ---

interface CaseNameData {
  /* we only have the ID and name for each case (as of 11/24/19) */
  cases: ICase[];
}

// Don't use this form directly
function DumbMergeCaseForm(props: FormProps) {
  const { uiStore, activeCaseStore } = props;
  const { getFieldDecorator } = props.form;

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // prevent page reload
    event.preventDefault();

    // validate form fields; raise errors
    const { form } = props;
    form.validateFields((errors, values) => {
      if (!errors && activeCase) {
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
    });
  };

  // populate our list of case options
  const { error, loading, data } = useQuery<CaseNameData>(GET_CASE_NAMES);

  let caseOptions: DataSourceItemType[] = [];

  if (loading) {
    caseOptions = [<Option key="loading">Loading...</Option>];
  } else if (error) {
    caseOptions = [<Option key="error">Failed to fetch tags</Option>];
  } else if (data) {
    caseOptions = data.cases.map(theCase => (
      <Option key={theCase.id} value={theCase.id}>
        {theCase.name}
      </Option>
    ));
  }

  // render the form
  return (
    <Form colon={false} onSubmit={handleSubmit}>
      <Form.Item label="Case to merge this case into">
        {getFieldDecorator("parentCase", {
          rules: [{ required: true, message: "Please select a case" }]
        })(
          <AutoComplete
            dataSource={caseOptions}
            filterOption={(inputValue, option) => {
              // filter options based on the name of the case
              const caseName = option.props.children;
              if (caseName) {
                return (
                  caseName
                    .toString()
                    .toLowerCase()
                    .indexOf(inputValue.toLowerCase()) !== -1
                );
              }
              return false;
            }}
          >
            <Input prefix={<UserOutlined />} placeholder="Filter cases" />
          </AutoComplete>
        )}
      </Form.Item>
      <Form.Item label="Reason">
        {getFieldDecorator("reason")(
          <TextArea placeholder="Describe how the two cases are related" />
        )}
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
}

const MergeCaseForm = Form.create<FormProps & FormComponentProps>()(
  inject("uiStore", "activeCaseStore")(observer(DumbMergeCaseForm))
);

// ---

interface MergeOneCaseModalProps {
  uiStore?: UIStore;
}

export default inject("uiStore")(
  observer(
    class MergeOneCaseModal extends React.Component<MergeOneCaseModalProps> {
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
