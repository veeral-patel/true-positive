import React from "react";
import { Table } from "antd";
import ICase from "../../ts/interfaces/ICase";
import PriorityTagP from "../shared/tags/PriorityTagP";
import StatusTagP from "../shared/tags/StatusTagP";
import ListOfTagsP from "../shared/tags/ListOfTagsP";
import IUser from "../../ts/interfaces/IUser";

const { Column } = Table;

interface ICasesTableProps {
  // list of case objects
  dataSource: ICase[];
}

const rowSelection = {
  onChange: (selectedRowKeys: string[] | number[], selectedRows: ICase[]) => {}
};

function compareUsers(u1: IUser | null, u2: IUser | null): number {
  // sort unassigned cases before assigned cases
  if (!u1 && u2) return -1;
  else if (u1 && !u2) return 1;
  // if two cases are unassigned, sort them equally
  else if (!u1 && !u2) return 0;
  // if both cases are assigned
  else {
    // then sort based on the assigned user's username
    if (u1 && u2) return u1.username.localeCompare(u2.username);
    // this should never happen
    else return 0;
  }
}

const CasesTableP: React.FC<ICasesTableProps> = props => {
  const { dataSource } = props;
  return (
    <Table
      dataSource={dataSource}
      rowSelection={rowSelection}
      rowKey={record => record.id.toString()}
    >
      <Column
        title="Name"
        dataIndex="name"
        key="name"
        sorter={(a: ICase, b: ICase) => a.name.localeCompare(b.name)}
      />
      <Column
        title="Tags"
        dataIndex="tags"
        key="tags"
        render={tags => <ListOfTagsP tags={tags} />}
      />
      <Column
        title="Status"
        dataIndex="status.name"
        key="status"
        render={(statusName: string) => <StatusTagP statusName={statusName} />}
        sorter={(a: ICase, b: ICase) =>
          a.status.name.localeCompare(b.status.name)
        }
      />
      <Column
        title="Priority"
        dataIndex="priority.name"
        key="priority"
        render={(priorityName: string) => (
          <PriorityTagP priorityName={priorityName} />
        )}
        sorter={(a: ICase, b: ICase) =>
          a.priority.name.localeCompare(b.priority.name)
        }
      />
      <Column
        title="Assigned To"
        dataIndex="assignedTo.username"
        key="assigned_to"
        sorter={(a: ICase, b: ICase) =>
          compareUsers(a.assignedTo, b.assignedTo)
        }
      />
      <Column title="Created At (UTC)" dataIndex="createdAt" key="created_at" />
      <Column
        title="Created By"
        dataIndex="createdBy.username"
        key="created_by"
        sorter={(a: ICase, b: ICase) => compareUsers(a.createdBy, b.createdBy)}
      />
    </Table>
  );
};

export default CasesTableP;
