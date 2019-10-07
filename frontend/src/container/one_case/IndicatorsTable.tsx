import { Table } from "antd";
import ListOfTagsP from "presentational/shared/tags/ListOfTagsP";
import React from "react";
import IIndicator from "ts/interfaces/IIndicator";
import compareUsers from "utils/compareUsers";

const { Column } = Table;

interface Props {
  indicators: IIndicator[];
}

class IndicatorsTable extends React.Component<Props> {
  render() {
    const { indicators } = this.props;
    return (
      <Table
        size="middle"
        dataSource={indicators}
        pagination={{ hideOnSinglePage: true }}
      >
        <Column
          title="Name"
          dataIndex="name"
          key="name"
          sorter={(a: IIndicator, b: IIndicator) =>
            a.name.localeCompare(b.name)
          }
        />
        <Column
          title="Tags"
          dataIndex="tags"
          key="tags"
          render={tags => <ListOfTagsP tags={tags} limit={3} />}
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
    );
  }
}

export default IndicatorsTable;
