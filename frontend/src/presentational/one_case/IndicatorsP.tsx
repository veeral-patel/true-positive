import { Layout, Table } from "antd";
import Column from "antd/lib/table/Column";
import React from "react";
import IIndicator from "ts/interfaces/IIndicator";
import compareUsers from "utils/compareUsers";
const { Content } = Layout;

interface IndicatorsProps {
  indicators: IIndicator[];
}

const IndicatorsP: React.FC<IndicatorsProps> = ({ indicators }) => (
  <Content
    style={{
      background: "#fff",
      padding: 24,
      margin: 0,
      minHeight: 280
    }}
  >
    <h2>Indicators</h2>
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
        title="Created By"
        dataIndex="createdBy.username"
        key="created_by"
        sorter={(a: IIndicator, b: IIndicator) =>
          compareUsers(a.createdBy, b.createdBy)
        }
      />
    </Table>
  </Content>
);

export default IndicatorsP;
