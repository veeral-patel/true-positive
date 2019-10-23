import TextArea from "antd/lib/input/TextArea";
import React from "react";
import IIndicator from "ts/interfaces/IIndicator";

interface Props {
  activeIndicator: IIndicator;
}

class IndicatorForm extends React.Component<Props> {
  render() {
    const { activeIndicator } = this.props;
    return (
      <TextArea
        defaultValue={activeIndicator.indicator}
        rows={5}
        placeholder="Enter your indicator here"
        style={{ padding: "2%", fontFamily: "monospace" }}
      />
    );
  }
}

export default IndicatorForm;
