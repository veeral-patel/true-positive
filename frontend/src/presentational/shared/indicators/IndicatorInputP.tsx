import { Icon, Input } from "antd";
import React from "react";

interface IndicatorInputProps {}

interface IndicatorInputState {
  status: "READY" | "LOADING";
  inputValue: string;
}

class IndicatorInputP extends React.Component<
  IndicatorInputProps,
  IndicatorInputState
> {
  constructor(props: IndicatorInputProps) {
    super(props);
    this.state = {
      status: "READY",
      inputValue: ""
    };
  }

  render() {
    const { status, inputValue } = this.state;

    let suffix;
    if (status === "READY") suffix = <Icon type="arrow-right" />;
    else if (status === "LOADING") suffix = <Icon type="loading" />;

    return (
      <Input
        placeholder="Enter an IP, file hash, domain, or URL to add it"
        value={inputValue}
        prefix={<Icon type="plus" />}
        suffix={suffix}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          this.setState({ inputValue: e.currentTarget.value })
        }
      />
    );
  }
}

export default IndicatorInputP;
