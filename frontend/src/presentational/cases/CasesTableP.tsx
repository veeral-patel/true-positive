import React from "react";
import { Table } from "antd";
import ICase from "../../ts/interfaces/ICase";
import { ColumnProps } from "antd/es/table";

const { Column } = Table;

interface ICasesTableProps {
  dataSource: ICase[]; // list of case objects
}

const CasesTableP: React.FC<ICasesTableProps> = props => {
  const { dataSource } = props;
  return (
    <div>
      <Table dataSource={dataSource}>
        <Column title="Name" dataIndex="name" key="name" />
        <Column title="Status" dataIndex="status.name" key="status" />
        <Column title="Priority" dataIndex="priority.name" key="priority" />
        <Column
          title="Assigned To"
          dataIndex="assignedTo.username"
          key="assigned_to"
        />
      </Table>
    </div>
  );
};

export default CasesTableP;
