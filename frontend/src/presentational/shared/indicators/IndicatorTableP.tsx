import { Layout, Table } from "antd";
import Column from "antd/lib/table/Column";
import ListOfTagsP from "presentational/shared/tags/ListOfTagsP";
import React from "react";
import IIndicator from "ts/interfaces/IIndicator";
import ITag from "ts/interfaces/ITag";
const { Content } = Layout;

interface IndicatorTableProps {
  indicators: IIndicator[];
}

const IndicatorTableP: React.FC<IndicatorTableProps> = ({ indicators }) => (
  <Table
    dataSource={indicators}
    rowKey={record => record.id.toString()}
    pagination={{ hideOnSinglePage: true }}
  >
    <Column
      title="Name"
      dataIndex="name"
      key="name"
      sorter={(a: IIndicator, b: IIndicator) => a.name.localeCompare(b.name)}
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
    />
  </Table>
);

export default IndicatorTableP;
