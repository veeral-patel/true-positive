import { Icon, Input } from "antd";
import React from "react";

class IndicatorInputP extends React.Component {
  render() {
    return (
      <Input
        placeholder="Enter an IP, file hash, domain, or URL to add it"
        prefix={<Icon type="plus" />}
        suffix={<Icon type="arrow-right" />}
      />
    );
  }
}

export default IndicatorInputP;
