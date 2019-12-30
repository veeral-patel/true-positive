import { Button, Form, Input } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import ActiveCaseStore from "stores/ActiveCaseStore";
import IIndicator from "ts/interfaces/IIndicator";

const { TextArea } = Input;

interface Props {
  activeIndicator: IIndicator;
  activeCaseStore?: ActiveCaseStore;
}

const IndicatorForm = inject("activeCaseStore")(
  observer(
    class InnerForm extends React.Component<Props> {
      render() {
        const { activeIndicator } = this.props;

        return (
          <Form
            colon={false}
            layout="vertical"
            onFinish={values => {
              alert(
                "Error: Please add an API to update text indicator values before continuing."
              );
            }}
            initialValues={{
              indicatorValue: activeIndicator.indicator
            }}
            style={{ width: "100%" }}
          >
            <Form.Item name="indicatorValue">
              <TextArea
                rows={5}
                placeholder="Enter your indicator here"
                style={{ fontFamily: "monospace" }}
              />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" style={{ float: "right" }}>
                Update
              </Button>
            </Form.Item>
          </Form>
        );
      }
    }
  )
);

export default IndicatorForm;
