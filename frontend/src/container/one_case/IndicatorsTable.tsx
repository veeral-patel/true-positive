import { Table } from "antd";
import React from "react";
import IIndicator from "ts/interfaces/IIndicator";

const { Column } = Table;

interface Props {
  indicators: IIndicator[];
}

class IndicatorsTable extends React.Component<Props> {
  render() {
    const { indicators } = this.props;
    return (
      <Table dataSource={indicators} pagination={{ hideOnSinglePage: true }}>
        <Column
          title="Name"
          dataIndex="name"
          key="name"
          sorter={(a: IIndicator, b: IIndicator) =>
            a.name.localeCompare(b.name)
          }
        />
      </Table>
    );
  }
}

export default IndicatorsTable;
