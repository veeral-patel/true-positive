import { Icon, Input } from "antd";
import React from "react";

interface IFilterInputProps {
  value: string;
}

const FilterInputP: React.FC<IFilterInputProps> = ({ value }) => (
  <Input
    value={value}
    placeholder="Filter cases"
    prefix={<Icon type="search" />}
  />
);

export default FilterInputP;
