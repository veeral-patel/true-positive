import { navigate } from "@reach/router";
import { Table } from "antd";
import { TableRowSelection } from "antd/lib/table";
import ExpandedRowP from "presentational/cases/ExpandedRowP";
import ListOfTagsP from "presentational/shared/tags/ListOfTagsP";
import PriorityTagP from "presentational/shared/tags/PriorityTagP";
import StatusTagP from "presentational/shared/tags/StatusTagP";
import React from "react";
import ICase from "ts/interfaces/ICase";
import compareUsers from "utils/compareUsers";
import { paths } from "utils/constants";

const { Column } = Table;

interface ICasesTableProps {
  // list of case objects
  dataSource: ICase[];
  rowSelection: TableRowSelection<ICase>;
}

const CasesTableP: React.FC<ICasesTableProps> = props => {
  const { dataSource, rowSelection } = props;
  return (
    <Table
      dataSource={dataSource}
      rowSelection={rowSelection}
      rowKey={theCase => theCase.id.toString()}
      expandedRowRender={theCase => (
        <ExpandedRowP description={theCase.description} tasks={theCase.tasks} />
      )}
      onRowClick={(clickedCase, index, event) =>
        navigate(`${paths.ALL_CASES_PATH}/${clickedCase.id}`)
      }
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
      <Column
        title="Created By"
        dataIndex="createdBy.username"
        key="created_by"
        sorter={(a: ICase, b: ICase) => compareUsers(a.createdBy, b.createdBy)}
      />
      <Column
        title="Created At (UTC)"
        dataIndex="formattedCreatedAt"
        key="formatted_created_at"
        sorter={(a: ICase, b: ICase) => a.createdAt.localeCompare(b.createdAt)}
      />
    </Table>
  );
};

export default CasesTableP;
