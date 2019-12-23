import { useMutation, useQuery } from "@apollo/react-hooks";
import { navigate } from "@reach/router";
import {
  Button,
  Form,
  Input,
  message,
  Modal,
  notification,
  Select,
  Tabs
} from "antd";
import { ApolloError } from "apollo-boost";
import "container/shared/modals/FormInModal.css";
import { inject, observer } from "mobx-react";
import CREATE_CASE_FROM_TEMPLATE from "mutations/createCaseFromTemplate";
import GET_CASE_TEMPLATES from "queries/getCaseTemplates";
import React from "react";
import AllCasesStore from "stores/AllCasesStore";
import PriorityStore from "stores/PriorityStore";
import StatusStore from "stores/StatusStore";
import UIStore from "stores/UIStore";
import ICase from "ts/interfaces/ICase";
import ICaseTemplate from "ts/interfaces/ICaseTemplate";
import { getPathToACase } from "utils/pathHelpers";

const { Option } = Select;

// -----

interface FormProps {
  statusStore?: StatusStore;
  priorityStore?: PriorityStore;
  uiStore?: UIStore;
  allCasesStore?: AllCasesStore;
}

const CreateCaseForm = inject(
  "statusStore",
  "priorityStore",
  "uiStore",
  "allCasesStore"
)(
  observer(
    class InnerForm extends React.Component<FormProps> {
      componentDidMount() {
        const { statusStore, priorityStore } = this.props;
        statusStore!.loadStatuses();
        priorityStore!.loadPriorities();
      }

      render() {
        const {
          uiStore,
          statusStore,
          priorityStore,
          allCasesStore
        } = this.props;

        const statusOptions = statusStore!.statuses.map(status => (
          <Option key={status.name} value={status.name}>
            {status.name}
          </Option>
        ));

        const priorityOptions = priorityStore!.priorities.map(priority => (
          <Option key={priority.name} value={priority.name}>
            {priority.name}
          </Option>
        ));

        return (
          <Form
            colon={false}
            layout="vertical"
            onFinish={values => {
              allCasesStore!.createCase(
                values.name,
                values.status,
                values.priority
              );
            }}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                { required: true, message: "Please enter a name for this case" }
              ]}
            >
              <Input
                placeholder="Found Ryuk"
                ref={input => input && input.focus()}
              />
            </Form.Item>
            <Form.Item
              label="Status"
              name="status"
              rules={[{ required: true, message: "Please choose a status" }]}
            >
              <Select
                showSearch
                defaultActiveFirstOption
                placeholder="Choose a status"
                style={{ minWidth: "200px" }}
              >
                {statusOptions}
              </Select>
            </Form.Item>
            <Form.Item
              label="Priority"
              name="priority"
              rules={[{ required: true, message: "Please choose a priority" }]}
            >
              <Select
                showSearch
                defaultActiveFirstOption
                placeholder="Choose a priority"
                style={{ minWidth: "200px" }}
              >
                {priorityOptions}
              </Select>
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
                  Create Case
                </Button>
              </div>
            </Form.Item>
          </Form>
        );
      }
    }
  )
);

// -----

interface FromTemplateFormProps {
  closeModal: () => void;
  allCasesStore?: AllCasesStore;
}

interface CaseTemplateData {
  caseTemplates: ICaseTemplate[];
}

interface MutationData {
  createCaseFromTemplate: {
    case: ICase | null;
  };
}

const FromTemplateForm = inject("allCasesStore")(
  observer(function InnerForm({
    closeModal,
    allCasesStore
  }: FromTemplateFormProps) {
    const { loading, error, data: queryData } = useQuery<CaseTemplateData>(
      GET_CASE_TEMPLATES
    );

    const [createCaseFromTemplate] = useMutation<MutationData>(
      CREATE_CASE_FROM_TEMPLATE,
      {
        onCompleted: function(mutationData) {
          // Show success message
          message.success("Created case");

          // Load the list of cases again
          allCasesStore!.loadCases();

          // Close the Create Case modal
          closeModal();

          // Navigate to the newly created case

          console.log(mutationData);

          if (
            mutationData &&
            mutationData.createCaseFromTemplate &&
            mutationData.createCaseFromTemplate.case
          ) {
            navigate(
              getPathToACase(mutationData.createCaseFromTemplate.case.id)
            );
          }
        },
        onError: function(error: ApolloError) {
          notification.error({
            message: "Could not create case",
            description: error.message
          });
        }
      }
    );

    var templateOptions = [];
    if (loading) {
      templateOptions = [
        <Option key="loading" value="loading" disabled>
          Loading...
        </Option>
      ];
    } else if (error || !queryData) {
      templateOptions = [
        <Option key="error" value="error" disabled>
          Failed to load templates
        </Option>
      ];
    } else {
      templateOptions = queryData.caseTemplates.map(caseTemplate => (
        <Option key={caseTemplate.id} value={caseTemplate.id}>
          {caseTemplate.name}
        </Option>
      ));
    }

    return (
      <Form
        colon={false}
        layout="vertical"
        onFinish={values =>
          createCaseFromTemplate({
            variables: {
              input: {
                templateId: values.template
              }
            }
          })
        }
      >
        <Form.Item
          label="Template"
          name="template"
          rules={[
            {
              required: true,
              message: "Please choose a template"
            }
          ]}
        >
          <Select
            showSearch
            placeholder="Choose a case template"
            defaultActiveFirstOption
          >
            {templateOptions}
          </Select>
        </Form.Item>
        <Form.Item>
          <div style={{ float: "right" }}>
            <Button style={{ marginRight: "0.5em" }} onClick={closeModal}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Create Case
            </Button>
          </div>
        </Form.Item>
      </Form>
    );
  })
);

// -----

interface ModalProps {
  uiStore?: UIStore;
}

export default inject("uiStore")(
  observer(
    class CreateCaseModal extends React.Component<ModalProps> {
      render() {
        const { uiStore } = this.props;
        return (
          <Modal
            visible={uiStore!.openModal === "CREATE_CASE_MODAL"}
            title="Create a Case"
            footer={null}
            onCancel={() => uiStore!.closeModal()}
            destroyOnClose={true}
            keyboard={false}
          >
            <Tabs>
              <Tabs.TabPane tab="From Scratch" key="from_scratch">
                <div style={{ marginTop: "8px" }} />
                <CreateCaseForm />
              </Tabs.TabPane>
              <Tabs.TabPane tab="From a Template" key="from_a_template">
                <div style={{ marginTop: "8px" }} />
                <FromTemplateForm closeModal={() => uiStore!.closeModal()} />
              </Tabs.TabPane>
            </Tabs>
          </Modal>
        );
      }
    }
  )
);
