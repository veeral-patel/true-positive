import { Icon, Input } from "antd";
import React from "react";

interface IndicatorInputProps {}

interface IndicatorInputState {
  status: "READY" | "LOADING";
}

class IndicatorInputP extends React.Component<
  IndicatorInputProps,
  IndicatorInputState
> {
  constructor(props: IndicatorInputProps) {
    super(props);
    this.state = {
      status: "READY"
    };
  }

  render() {
    const { status } = this.state;

    let suffix;
    if (status === "READY") suffix = <Icon type="arrow-right" />;
    else if (status === "LOADING") suffix = <Icon type="loading" />;

    return (
      <Input
        placeholder="Enter an IP, file hash, domain, or URL to add it"
        prefix={<Icon type="plus" />}
        suffix={suffix}
      />
    );
  }
}

export default IndicatorInputP;
