import { navigate } from "@reach/router";
import { Table } from "antd";
import { ColumnFilterItem, TableRowSelection } from "antd/lib/table";
import ExpandedRowP from "presentational/all_cases/ExpandedRowP";
import ListOfTagsP from "presentational/shared/tags/ListOfTagsP";
import PriorityTagP from "presentational/shared/tags/PriorityTagP";
import StatusTagP from "presentational/shared/tags/StatusTagP";
import React from "react";
import ICase from "ts/interfaces/ICase";
import ITag from "ts/interfaces/ITag";
import compareUsers from "utils/compareUsers";
import { paths } from "utils/constants";
import {
  assignedToMatches,
  aTagMatches,
  createdByMatches,
  priorityMatches,
  statusMatches
} from "utils/filterCases";

const { Column } = Table;

interface ICasesTableProps {
  dataSource: ICase[];
  rowSelection: TableRowSelection<ICase>;
  statusFilters: ColumnFilterItem[];
  priorityFilters: ColumnFilterItem[];
  userFilters: ColumnFilterItem[];
  tagFilters: ColumnFilterItem[];
}

const CasesTableP: React.FC<ICasesTableProps> = props => {
  const {
    dataSource,
    rowSelection,
    statusFilters,
    priorityFilters,
    userFilters,
    tagFilters
  } = props;
  return (
    <Table
      dataSource={dataSource}
      rowSelection={rowSelection}
      rowKey={theCase => theCase.id.toString()}
      expandedRowRender={theCase => (
        <ExpandedRowP description={theCase.description} tasks={theCase.tasks} />
      )}
      onRowClick={(clickedCase, index, event) =>
        navigate(`${paths.CASES_PATH}/${clickedCase.id}`)
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
        render={(tags: ITag[]) => (
          <div style={{ lineHeight: 2.0 }}>
            <ListOfTagsP tags={tags} />
          </div>
        )}
        filters={tagFilters}
        onFilter={(filterWord: string, record: ICase) =>
          aTagMatches(filterWord, record)
        }
      />
      <Column
        title="Status"
        dataIndex="status.name"
        key="status"
        render={(statusName: string) => <StatusTagP statusName={statusName} />}
        sorter={(a: ICase, b: ICase) =>
          a.status.name.localeCompare(b.status.name)
        }
        filters={statusFilters}
        onFilter={(filterWord, record) => statusMatches(filterWord, record)}
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
        filters={priorityFilters}
        onFilter={(filterWord, record) => priorityMatches(filterWord, record)}
      />
      <Column
        title="Assigned To"
        dataIndex="assignedTo.username"
        key="assigned_to"
        sorter={(a: ICase, b: ICase) =>
          compareUsers(a.assignedTo, b.assignedTo)
        }
        filters={userFilters}
        onFilter={(filterWord, record) => assignedToMatches(filterWord, record)}
      />
      <Column
        title="Created By"
        dataIndex="createdBy.username"
        key="created_by"
        sorter={(a: ICase, b: ICase) => compareUsers(a.createdBy, b.createdBy)}
        filters={userFilters}
        onFilter={(filterWord, record) => createdByMatches(filterWord, record)}
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
