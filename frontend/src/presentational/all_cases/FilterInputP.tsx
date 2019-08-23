import { Icon, Input } from "antd";
import React from "react";

interface IFilterInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FilterInputP: React.FC<IFilterInputProps> = ({ value, onChange }) => (
  <Input
    value={value}
    placeholder="Filter cases"
    prefix={<Icon type="search" />}
    onChange={onChange}
  />
);

export default FilterInputP;
