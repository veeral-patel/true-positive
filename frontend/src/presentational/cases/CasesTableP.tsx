import React from "react";
import { Table } from "antd";
import IPerson from "../../ts/interfaces/IPerson";

interface ICasesTableProps {
  dataSource: IPerson[];
}

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age"
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address"
  }
];

const CasesTableP: React.FC<ICasesTableProps> = props => {
  const { dataSource } = props;
  return (
    <div>
      <Table columns={columns} dataSource={dataSource} />
    </div>
  );
};

export default CasesTableP;
