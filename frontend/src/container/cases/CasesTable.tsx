import React from "react";
import CasesTableP from "../../presentational/cases/CasesTableP";

const dataSource = [
  {
    key: "1",
    name: "Mike",
    age: 32,
    address: "10 Downing Street"
  },
  {
    key: "2",
    name: "John",
    age: 42,
    address: "10 Downing Street"
  }
];

const CasesTable: React.SFC = () => {
  return <CasesTableP dataSource={dataSource} />;
};

export default CasesTable;
