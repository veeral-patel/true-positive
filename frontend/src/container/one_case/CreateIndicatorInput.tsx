import { PlusOutlined } from "@ant-design/icons";
import { Icon, Input, Typography } from "antd";
import React from "react";
import { matchIndicator } from "utils/matchIndicator";

const { Text } = Typography;

interface Props {
  /* the callback that's run when you hit enter after inputting your indicator. */
  handleEnter: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

interface State {
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
    | "CVE"
    | "OTHER";
  inputValue: string;
}

class CreateIndicatorInput extends React.Component<Props, State> {
  constructor(props: Props) {
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
    const { handleEnter } = this.props;

    let suffix;
    if (status === "EMPTY") suffix = <Icon type="arrow-right" />;
    else if (status === "LOADING") suffix = <Icon type="loading" />;
    else
      suffix = (
        <Text style={{ backgroundColor: "#f5f5f5", color: "#8c8c8c" }}>
          {status}
        </Text>
      );

    return (
      <Input
        placeholder="Enter an IP, file hash, domain, email, MAC address, or URL to add it"
        value={inputValue}
        prefix={<PlusOutlined />}
        suffix={suffix}
        onChange={this.handleChange.bind(this)}
        onPressEnter={handleEnter}
      />
    );
  }
}

export default CreateIndicatorInput;
