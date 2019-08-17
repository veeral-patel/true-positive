import React from "react";
import { Table } from "antd";
import ICase from "../../ts/interfaces/ICase";
import { ColumnProps } from "antd/es/table";

interface ICasesTableProps {
  dataSource: ICase[]; // list of case objects
}

const columns: ColumnProps<ICase>[] = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name"
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
