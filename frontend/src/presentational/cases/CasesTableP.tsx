import React from "react";
import { Table, Tag } from "antd";
import ICase from "../../ts/interfaces/ICase";
import PriorityTagP from "../shared/tags/PriorityTagP";
import StatusTagP from "../shared/tags/StatusTagP";

const { Column } = Table;

interface ICasesTableProps {
  dataSource: ICase[]; // list of case objects
}

const rowSelection = {
  onChange: (selectedRowKeys: string[] | number[], selectedRows: ICase[]) => {}
};

const CasesTableP: React.FC<ICasesTableProps> = props => {
  const { dataSource } = props;
  return (
    <Table
      dataSource={dataSource}
      rowSelection={rowSelection}
      rowKey={record => record.id.toString()}
    >
      <Column title="Name" dataIndex="name" key="name" />
      <Column
        title="Tags"
        dataIndex="tags"
        key="tags"
        render={tags => (
          <span>
            {tags.map((tag: string) => (
              <Tag color="blue" key={tag}>
                {tag}
              </Tag>
            ))}
          </span>
        )}
      />
      <Column
        title="Status"
        dataIndex="status.name"
        key="status"
        render={(statusName: string) => <StatusTagP statusName={statusName} />}
      />
      <Column
        title="Priority"
        dataIndex="priority.name"
        key="priority"
        render={(priorityName: string) => (
          <PriorityTagP priorityName={priorityName} />
        )}
      />
      <Column
        title="Assigned To"
        dataIndex="assignedTo.username"
        key="assigned_to"
      />
      <Column
        title="Created By"
        dataIndex="createdBy.username"
        key="created_by"
      />
    </Table>
  );
};

export default CasesTableP;
