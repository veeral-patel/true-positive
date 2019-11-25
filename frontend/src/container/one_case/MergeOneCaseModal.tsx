import { useQuery } from "@apollo/react-hooks";
import { Alert, AutoComplete, Form, Icon, Input, Modal, Select } from "antd";
import { DataSourceItemType } from "antd/lib/auto-complete";
import { FormComponentProps } from "antd/lib/form";
import { WrappedFormUtils } from "antd/lib/form/Form";
import { inject, observer } from "mobx-react";
import GET_CASE_NAMES from "queries/getCaseNames";
import React from "react";
import UIStore from "stores/UIStore";
import ICase from "ts/interfaces/ICase";

const { Option } = Select;
const { TextArea } = Input;

interface FormProps {
  form: WrappedFormUtils;
}

// ---

interface CaseNameData {
  /* we only have the ID and name for each case (as of 11/24/19) */
  cases: ICase[];
}

// Don't use this form directly
function DumbMergeCaseForm(props: FormProps) {
  const { getFieldDecorator } = props.form;

  const { error, loading, data } = useQuery<CaseNameData>(GET_CASE_NAMES);

  let caseOptions: DataSourceItemType[] = [];

  if (loading) {
    caseOptions = [<Option key="loading">Loading...</Option>];
  } else if (error) {
    caseOptions = [<Option key="error">Failed to fetch tags</Option>];
  } else if (data) {
    caseOptions = data.cases.map(theCase => (
      <Option key={theCase.id}>{theCase.name}</Option>
    ));
  }

  return (
    <Form colon={false}>
      <Form.Item label="The case to merge this case into" required={true}>
        {getFieldDecorator("parentCase")(
          <AutoComplete dataSource={caseOptions}>
            <Input prefix={<Icon type="search" />} placeholder="Filter cases" />
          </AutoComplete>
        )}
      </Form.Item>
      <Form.Item label="Reason">
        {getFieldDecorator("reason")(
          <TextArea placeholder="Describe how the two cases are related" />
        )}
      </Form.Item>
    </Form>
  );
}

const MergeCaseForm = Form.create<FormProps & FormComponentProps>()(
  observer(DumbMergeCaseForm)
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
            okText="Merge"
            destroyOnClose={true}
            keyboard={false}
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
