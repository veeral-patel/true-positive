import { Button, Form, Select } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import ActiveCaseStore from "stores/ActiveCaseStore";

interface Props {
  userOptions: React.ReactNode[];
  activeCaseStore?: ActiveCaseStore;
}

const AddMembersForm = inject("activeCaseStore")(
  observer(
    class InnerForm extends React.Component<Props> {
      render() {
        const { userOptions, activeCaseStore } = this.props;

        return (
          <Form
            colon={false}
            layout="vertical"
            style={{ display: "flex" }}
            onFinish={values => {
              if (!values.members) return; // ignore empty input
              values.members.forEach((username: string) => {
                activeCaseStore!.addCaseMember(username);
              });
            }}
          >
            <Form.Item style={{ flex: "80%" }} name="members">
              <Select
                style={{ width: "100%" }}
                mode="multiple"
                placeholder="Select users to add"
              >
                {userOptions}
              </Select>
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit">Add Members</Button>
            </Form.Item>
          </Form>
        );
      }
    }
  )
);

export default AddMembersForm;
