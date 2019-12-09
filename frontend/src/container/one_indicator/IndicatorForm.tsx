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
        const { activeIndicator, activeCaseStore } = this.props;

        return (
          <Form
            colon={false}
            layout="vertical"
            onFinish={values => {
              activeCaseStore!.changeIndicatorValue(
                activeIndicator.id,
                values.indicatorValue
              );
            }}
            initialValues={{
              indicatorValue: activeIndicator.indicator
            }}
          >
            <Form.Item label="Indicator" name="indicatorValue">
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
