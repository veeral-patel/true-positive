import { Button, Form, Input } from "antd";
import { FormComponentProps, WrappedFormUtils } from "antd/lib/form/Form";
import { inject, observer } from "mobx-react";
import React from "react";
import ActiveCaseStore from "stores/ActiveCaseStore";
import IIndicator from "ts/interfaces/IIndicator";

const { TextArea } = Input;

interface FormProps {
  activeIndicator: IIndicator;
  form: WrappedFormUtils;
  activeCaseStore?: ActiveCaseStore;
}

class DumbIndicatorForm extends React.Component<
  FormProps & FormComponentProps
> {
  render() {
    const { activeIndicator } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit.bind(this)}>
        <Form.Item>
          {getFieldDecorator("indicatorValue", {
            initialValue: activeIndicator.indicator
          })(
            <TextArea
              rows={5}
              placeholder="Enter your indicator here"
              style={{ padding: "2%", fontFamily: "monospace" }}
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" style={{ float: "right" }}>
            Update Indicator
          </Button>
        </Form.Item>
      </Form>
    );
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    // prevent page reload
    event.preventDefault();

    // validate fields in our form
    const { form, activeCaseStore, activeIndicator } = this.props;
    form.validateFields((errors: any, values: any) => {
      if (!errors) {
        activeCaseStore!.changeIndicatorValue(
          activeIndicator.id,
          values.indicatorValue
        );
      }
    });
  }
}

const IndicatorForm = Form.create<FormProps & FormComponentProps>()(
  inject("activeCaseStore")(observer(DumbIndicatorForm))
);

export default IndicatorForm;
