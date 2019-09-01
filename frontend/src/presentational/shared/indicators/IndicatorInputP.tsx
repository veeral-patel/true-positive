import { Icon, Input } from "antd";
import React from "react";
import { matchIndicator } from "utils/matchIndicator";

interface IndicatorInputProps {}

interface IndicatorInputState {
  status:
    | "EMPTY"
    | "LOADING"
    | "MD5"
    | "SHA1"
    | "SHA256"
    | "IPv4"
    | "IPv6"
    | "URL"
    | "MAC_ADDRESS"
    | "EMAIL"
    | "DOMAIN"
    | "SSDEEP"
    | "OTHER";
  inputValue: string;
}

class IndicatorInputP extends React.Component<
  IndicatorInputProps,
  IndicatorInputState
> {
  constructor(props: IndicatorInputProps) {
    super(props);
    this.state = {
      status: "EMPTY",
      inputValue: ""
    };
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    // update our input value
    const newValue = event.currentTarget.value;
    this.setState({ inputValue: newValue });

    // if we've entered some input, set the status to the indicator type
    if (newValue) {
      const matchedType = matchIndicator(newValue);
      this.setState({ status: matchedType });
    } else {
      // otherwise, if the input is empty, set the status to empty
      this.setState({ status: "EMPTY" });
    }
  }

  render() {
    const { status, inputValue } = this.state;

    let suffix;
    if (status === "EMPTY") suffix = <Icon type="arrow-right" />;
    else if (status === "LOADING") suffix = <Icon type="loading" />;
    else suffix = status;

    return (
      <Input
        placeholder="Enter an IP, file hash, domain, email, MAC address, or URL to add it"
        value={inputValue}
        prefix={<Icon type="plus" />}
        suffix={suffix}
        onChange={this.handleChange.bind(this)}
      />
    );
  }
}

export default IndicatorInputP;
